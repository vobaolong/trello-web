import Box from '@mui/material/Box'
import ModeSelect from '../ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as TrelloIcon } from '@/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import WorkSpaces from './Menus/WorkSpaces'
import Recent from './Menus/Recent'
import Template from './Menus/Template'
import Started from './Menus/Started'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profile from './Menus/Profile'
import { InputAdornment } from '@mui/material'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'

function AppBar() {
  const [searchValue, setSearchValue] = useState('')
  // const { mode } = useColorScheme()
  // const buttonVariant = mode === 'light' ? 'outlined' : 'contained'

  return (
    <>
      <Box
        sx={{
          px: 2,
          width: '100%',
          height: (theme) => theme.trello.appBarHeight,
          display: 'flex',
          cursor: 'pointer',
          alignItems: 'center',
          backgroundColor: 'background.default',
          justifyContent: 'space-between',
          gap: 2,
          overflowX: 'auto',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0'
        }}
      >
        <Box
          sx={{
            gap: 2,
            display: 'flex',
            cursor: 'pointer',
            alignItems: 'center'
          }}
        >
          <AppsIcon sx={{ color: 'white' }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <SvgIcon
              fontSize='small'
              inheritViewBox
              component={TrelloIcon}
              sx={{ color: 'white' }}
            />
            <Typography
              variant='span'
              sx={{
                fontWeight: 'bold',
                fontSize: '1.2rem',
                color: 'white'
              }}
            >
              Trello
            </Typography>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <WorkSpaces />
            <Recent />
            <Started />
            <Template />
            <Button
              sx={{
                color: 'white',
                border: 'none',
                '&:hover': { border: 'none' }
              }}
              startIcon={<LibraryAddIcon />}
              // variant={buttonVariant}
              variant='outlined'
            >
              create
            </Button>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            id='outlined-search'
            label='Search...'
            type='text'
            size='small'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon sx={{ color: 'white' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <CloseIcon
                  fontSize='small'
                  sx={{
                    color: 'white',
                    cursor: 'pointer',
                    display: searchValue ? 'block' : 'none'
                  }}
                  onClick={() => setSearchValue('')}
                />
              )
            }}
            sx={{
              minWidth: '120px',
              maxWidth: '170px',
              '& label': { color: 'white' },
              '& label.Mui-focused': { color: 'white' },
              '& input': { color: 'white' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white'
                },
                '&:hover fieldset': {
                  borderColor: 'white'
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white'
                }
              }
            }}
          />
          <ModeSelect />
          <Tooltip title='Notifications'>
            <Badge color='warning' variant='dot'>
              <NotificationsNoneIcon
                sx={{ color: 'white', cursor: 'pointer' }}
              />
            </Badge>
          </Tooltip>
          <Tooltip title='Help'>
            <HelpOutlineIcon sx={{ color: 'white', cursor: 'pointer' }} />
          </Tooltip>
          <Profile />
        </Box>
      </Box>
    </>
  )
}

export default AppBar
