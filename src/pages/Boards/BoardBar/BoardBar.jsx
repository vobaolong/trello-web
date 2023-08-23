import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterList from '@mui/icons-material/FilterList'
import AvatarGroup from '@mui/material/AvatarGroup'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import { useColorScheme } from '@mui/material'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const MENU_STYLES = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  px: '5px',
  borderRadius: '4px',
  '.MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': { bgcolor: 'primary.50' }
}
function BoardBar() {
  return (
    <>
      <Box
        sx={{
          // backgroundColor: 'primary.dark',
          width: '100%',
          height: (theme) => theme.trello.boardBarHeight,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          px: 2,
          overflowX: 'auto',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
          '&::-webkit-scrollbar-track': {
            m: 2
          }
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
          <Chip
            sx={MENU_STYLES}
            onClick={() => {}}
            clickable
            icon={<DashboardIcon />}
            label='Board of Director'
          />
          <Chip
            sx={MENU_STYLES}
            onClick={() => {}}
            clickable
            icon={<VpnLockIcon />}
            label='Public/Private Workspace'
          />
          <Chip
            sx={MENU_STYLES}
            onClick={() => {}}
            clickable
            icon={<AddToDriveIcon />}
            label='Add To GoogleDrive'
          />
          <Chip
            sx={MENU_STYLES}
            onClick={() => {}}
            clickable
            icon={<BoltIcon />}
            label='Automation'
          />
          <Chip
            sx={MENU_STYLES}
            onClick={() => {}}
            clickable
            icon={<FilterList />}
            label='Filters'
          />
        </Box>

        <Box
          sx={{
            gap: 2,
            display: 'flex',
            cursor: 'pointer',
            alignItems: 'center'
          }}
        >
          <Button
            variant='outlined'
            startIcon={<PersonAddIcon />}
            sx={{
              color: 'white',
              borderColor: 'white',
              '&:hover': { borderColor: 'white' }
            }}
          >
            invite
          </Button>
          <AvatarGroup
            max={6}
            sx={{
              gap: '5px',
              '& .MuiAvatar-root': {
                width: 34,
                height: 34,
                fontSize: 16,
                border: 'none',
                color: 'white',
                '&:first-of-type': { bgcolor: '#a4b0be' }
              }
            }}
          >
            <Tooltip title='Như Ý'>
              <Avatar
                alt='Như Ý'
                src='https://haycafe.vn/wp-content/uploads/2022/11/Hinh-anh-meme-cheems.jpg'
              />
            </Tooltip>
            <Tooltip title='Bảo Long'>
              <Avatar
                alt='Bảo Long'
                src='https://img-9gag-fun.9cache.com/photo/a5Xy7WE_460s.jpg'
              />
            </Tooltip>
            <Tooltip title='Quần Què'>
              <Avatar
                alt='Quần Què'
                src='https://kenh14cdn.com/thumb_w/660/203336854389633024/2023/2/1/uunupmkl-16752228465761277955095.jpg'
              />
            </Tooltip>
            <Tooltip title='Như Ý'>
              <Avatar
                alt='Như Ý'
                src='https://haycafe.vn/wp-content/uploads/2022/11/Hinh-anh-meme-cheems.jpg'
              />
            </Tooltip>
            <Tooltip title='Bảo Long'>
              <Avatar
                alt='Bảo Long'
                src='https://img-9gag-fun.9cache.com/photo/a5Xy7WE_460s.jpg'
              />
            </Tooltip>
            <Tooltip title='Quần Què'>
              <Avatar
                alt='Quần Què'
                src='https://kenh14cdn.com/thumb_w/660/203336854389633024/2023/2/1/uunupmkl-16752228465761277955095.jpg'
              />
            </Tooltip>
            <Tooltip title='Như Ý'>
              <Avatar
                alt='Như Ý'
                src='https://haycafe.vn/wp-content/uploads/2022/11/Hinh-anh-meme-cheems.jpg'
              />
            </Tooltip>
            <Tooltip title='Bảo Long'>
              <Avatar
                alt='Bảo Long'
                src='https://img-9gag-fun.9cache.com/photo/a5Xy7WE_460s.jpg'
              />
            </Tooltip>
            <Tooltip title='Quần Què'>
              <Avatar
                alt='Quần Què'
                src='https://kenh14cdn.com/thumb_w/660/203336854389633024/2023/2/1/uunupmkl-16752228465761277955095.jpg'
              />
            </Tooltip>
          </AvatarGroup>
        </Box>
      </Box>
    </>
  )
}

export default BoardBar
