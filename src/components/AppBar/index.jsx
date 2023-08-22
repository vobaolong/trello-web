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
import { useColorScheme } from '@mui/material'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'

function AppBar() {
  const { mode } = useColorScheme()
  const buttonVariant = mode === 'light' ? 'outlined' : 'contained'

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
          overflowX: 'auto'
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
          <AppsIcon sx={{ color: 'primary.main' }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <SvgIcon
              fontSize='small'
              inheritViewBox
              component={TrelloIcon}
              sx={{ color: 'primary.main' }}
            />
            <Typography
              variant='span'
              sx={{
                fontWeight: 'bold',
                fontSize: '1.2rem',
                color: 'primary.main'
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
            <Button startIcon={<LibraryAddIcon />} variant={buttonVariant}>
              create
            </Button>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            id='outlined-search'
            label='Search...'
            type='search'
            size='small'
            sx={{ minWidth: 120 }}
          />
          <ModeSelect />
          <Tooltip title='Notifications'>
            <Badge color='error' variant='dot'>
              <NotificationsNoneIcon
                sx={{ color: 'primary.main', cursor: 'pointer' }}
              />
            </Badge>
          </Tooltip>
          <Tooltip title='Help'>
            <HelpOutlineIcon
              sx={{ color: 'primary.main', cursor: 'pointer' }}
            />
          </Tooltip>
          <Profile />
        </Box>
      </Box>
    </>
  )
}

export default AppBar
