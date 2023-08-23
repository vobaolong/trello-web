import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import PostAddIcon from '@mui/icons-material/PostAdd'

function ListColumns({ columns }) {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          bgcolor: 'inherit',
          overflowX: 'auto',
          overflowY: 'hidden',
          '&::-webkit-scrollbar-track': {
            m: 2
          }
        }}
      >
        {columns?.map((column) => (
          <Column key={column._id} column={column} />
        ))}
        <Box
          sx={{
            minWidth: '180px',
            maxWidth: '180px',
            mx: 2,
            borderRadius: '6px',
            height: 'fit-content',
            bgcolor: '#ffffff3d'
          }}
        >
          <Button
            variant='outlined'
            startIcon={<PostAddIcon />}
            sx={{
              py: 1,
              pl: 2.5,
              color: 'white',
              width: '100%',
              justifyContent: 'flex-start',
              '&:hover': { borderColor: 'white' }
            }}
          >
            Add new column
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default ListColumns
