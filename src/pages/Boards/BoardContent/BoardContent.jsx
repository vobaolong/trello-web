import { useCallback, useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '@/utils/sorts'
import {
  DndContext,
  // PointerSensor,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  pointerWithin,
  getFirstCollision
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep } from 'lodash'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}
function BoardContent({ board }) {
  // di chuyển chuột 10px thì mới kích hoạt
  // const pointerSensor = useSensor(PointerSensor, {
  //   activationConstraint: { distance: 10 }
  // })
  // Di chuyển chuột 10px thì mới kích hoạt event
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 }
  })
  // Nhấn giữ 250ms (1/4s) và di chuyển 500px thì mới kích hoạt event
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 500 }
  })
  // const sensors = useSensors(pointerSensor)
  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])
  // cùng 1 thời điểm chỉ có thể kéo column hoặc card
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDragging, setOldColumnWhenDragging] = useState(null)
  const lastOverId = useRef(null)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const findColumnByCardId = (cardId) => {
    return orderedColumns.find((column) =>
      column.cards.map((card) => card._id)?.includes(cardId)
    )
  }
  const moveCardBwDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumns((prevColumns) => {
      // tìm vị trí của overCard trong column đích nơi mà activeCard được Drop
      const overCardIndex = overColumn?.cards?.findIndex(
        (card) => card._id === overCardId
      )
      // tính toán cardIndex mới (trên hay dưới của overCard)
      let newCardIndex
      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height

      const modifier = isBelowOverItem ? 1 : 0

      newCardIndex =
        overCardIndex >= 0
          ? overCardIndex + modifier
          : overColumn?.cards?.length + 1
      // clone mảng orderedColumnsState ra một mảng mới để xử lý data rồi return - cập nhật lại orderedColumnsState mới
      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns.find(
        (column) => column._id === activeColumn._id
      )
      const nextOverColumn = nextColumns.find(
        (column) => column._id === overColumn._id
      )

      if (nextActiveColumn) {
        // xoá card ở columnActive trong khi move nó sang column khác
        nextActiveColumn.cards = nextActiveColumn.cards.filter(
          (card) => card._id !== activeDraggingCardId
        )
        // update lại mảng cardOrderIds cho chuẩn data
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
          (card) => card._id
        )
      }
      if (nextOverColumn) {
        // check card dragging có tồn tại ở overColumn hay chưa, nếu có thì xoá trước khi thả
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => card._id !== activeDraggingCardId
        )
        // tiếp theo thêm card đang kéo vào overColumn với index mới
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(
          newCardIndex,
          0,
          activeDraggingCardData
        )
        // update lại mảng cardOrderIds cho chuẩn data
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
          (card) => card._id
        )
      }

      return nextColumns
    })
  }
  // trigger trong quá trình bắt đầu kéo một phần tử
  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    )
    // nếu là Drag card thì mới thực hiện set giá trị oldColumn
    setActiveDragItemData(event?.active?.data?.current)
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDragging(findColumnByCardId(event?.active?.id))
    }
  }
  // trigger trong quá trình kéo một phần tử
  const handleDragOver = (event) => {
    // không làm gì thêm nếu đang kéo column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    // nếu kéo card thì xử lý thêm để có thể kéo card giữa các column
    const { active, over } = event
    // đảm bảo nếu không tồn tại active hoặc over (khi kéo ra khỏi container) thì không làm gì
    if (!active || !over) return

    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData }
    } = active
    // overCard: là card đang được tương tác với card được kéo
    const { id: overCardId } = over
    // tìm 2 columns theo cardId
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    if (!activeColumn || !overColumn) return
    // khi kéo card giữa 2 column khác nhau thì mới xử lý logic
    if (activeColumn._id !== overColumn._id) {
      moveCardBwDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      )
    }
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    // đảm bảo nếu không tồn tại active hoặc over (khi kéo ra khỏi container) thì không làm gì
    if (!active || !over) return

    // Xử lý kéo thả card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData }
      } = active
      // overCard: là card đang được tương tác với card được kéo
      const { id: overCardId } = over
      // tìm 2 columns theo cardId
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      if (!activeColumn || !overColumn) return

      if (oldColumnWhenDragging._id !== overColumn._id) {
        moveCardBwDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        )
      } else {
        // hành động kéo thả card trong 1 column

        // lấy vị trí cũ (từ oldColumnWhenDragging)
        const oldCardIndex = oldColumnWhenDragging?.cards?.findIndex(
          (card) => card._id === activeDragItemId
        )
        // lấy vị trí mới
        const newCardIndex = overColumn?.cards?.findIndex(
          (card) => card._id === overCardId
        )
        // dùng arrayMove thì nó tương tự như dnd column trong boardContent
        const dndOrderedCards = arrayMove(
          oldColumnWhenDragging?.cards,
          oldCardIndex,
          newCardIndex
        )
        setOrderedColumns((prevColumns) => {
          const nextColumns = cloneDeep(prevColumns)

          // tìm tới column đang Drop
          const targetColumn = nextColumns.find(
            (column) => column._id === overColumn._id
          )
          // update 2 giá trị mới là card và cardOrderIds trong targetColumn
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map((card) => card._id)
          return nextColumns
        })
      }
    }

    // xử lý kéo thả column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      // nếu vị trí kéo thả khác với vị trí ban đầu
      if (active.id != over.id) {
        // lấy vị trí cũ
        const oldColumnIndex = orderedColumns.findIndex(
          (column) => column._id === active.id
        )
        // lấy vị trí mới
        const newColumnIndex = orderedColumns.findIndex(
          (column) => column._id === over.id
        )
        const dndOrderedColumns = arrayMove(
          orderedColumns,
          oldColumnIndex,
          newColumnIndex
        )
        setOrderedColumns(dndOrderedColumns)
      }
    }
    // những dữ liệu sau khi dnd thì phải luôn đưa về giá trị null ban đầu
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDragging(null)
  }

  // Animation khi Drop, test bằng cách kéo xong
  // thả trực tiếp và nhìn phần giữ chỗ Overlay
  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: { opacity: '0.5' }
      }
    })
  }

  const collisionDetectionStrategy = useCallback(
    (args) => {
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args })
      }

      // tìm các điểm giao nhau
      const pointerIntersection = pointerWithin(args)
      // nếu pointerIntersection là mảng rỗng thì return
      if (!pointerIntersection?.length) return

      // thuật toán phát hiện va chạm sẽ trả về 1 mảng các va chạm ở đây
      // const intersection = !!pointerIntersection?.length
      //   ? pointerIntersection
      //   : rectIntersection(args)

      // tìm overId đầu tiên trong đám pointerIntersection
      let overId = getFirstCollision(pointerIntersection, 'id')
      if (overId) {
        const intersectColumn = orderedColumns.find(
          (column) => column._id === overId
        )
        if (intersectColumn) {
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (container) => {
                return (
                  container.id !== overId &&
                  intersectColumn?.cardOrderIds?.includes(container.id)
                )
              }
            )
          })[0]?.id
        }
        lastOverId.current = overId
        return [{ id: overId }]
      }

      return lastOverId.current ? [{ id: lastOverId.current }] : []
    },
    [activeDragItemType, orderedColumns]
  )
  return (
    <DndContext
      sensors={sensors}
      // collisionDetection={closestCorners}
      // custom thuật toán phát hiện va chạm nâng cao
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
          width: '100%',
          height: (theme) => theme.trello.boardContentHeight,
          p: '10px 0'
        }}
      >
        <ListColumns columns={orderedColumns} />
        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <Column column={activeDragItemData} />
          )}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
            <Card card={activeDragItemData} />
          )}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
