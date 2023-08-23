import Box from '@mui/material/Box'
import Card from './Card/Card'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

function ListCards({ cards }) {
  return (
    <SortableContext
      items={cards?.map((card) => card._id)}
      strategy={verticalListSortingStrategy}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          p: '0 5px',
          m: '0 5px',
          overflowX: 'hidden',
          overflowY: 'auto',
          maxHeight: (theme) =>
            `calc(${theme.trello.boardContentHeight} -
                  ${theme.spacing(5)} -
                  ${theme.trello.columnHeaderHeight} -
                  ${theme.trello.columnFooterHeight}
                )`,
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#ced0da',
            borderRadius: '8px'
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#bfc2cf',
            borderRadius: '8px'
          }
        }}
      >
        {cards?.map((card) => (
          <Card key={card._id} card={card} />
        ))}
      </Box>
    </SortableContext>
  )
}

export default ListCards
