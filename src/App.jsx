import * as React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from '@mui/material/Button'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
function App() {
  return (
    <>
      <Button variant='outlined'>Hello world</Button>
      <Button variant='contained'>Hello world</Button>
      <AccessAlarmIcon />
    </>
  )
}

export default App
