import './App.css'
import Button from '@mui/material/Button'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
function App() {
  return (
    <>
      <Typography component='div'>
        <Box sx={{ textTransform: 'uppercase', m: 1 }}>HEllo</Box>
      </Typography>
      <Button variant='outlined'>Hello world</Button>
      <Button variant='contained'>Hello world</Button>
      <AccessAlarmIcon />
    </>
  )
}

export default App
