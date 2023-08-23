// Board Details

import AppBar from '@/components/AppBar/AppBar'
import { Container } from '@mui/material'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'

function Board() {
  return (
    <>
      <Container maxWidth={false} disableGutters sx={{ height: '100vh' }}>
        <AppBar />
        <BoardBar />
        <BoardContent />
      </Container>
    </>
  )
}

export default Board
