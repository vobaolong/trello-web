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
  color: 'primary.main',
  bgcolor: 'white',
  border: 'none',
  px: '5px',
  borderRadius: '4px',
  '& .MuiSvgIcon-root': {
    color: 'primary.main'
  },
  '&:hover': { bgcolor: '#e1f5fe' }
}
function BoardBar() {
  const { mode } = useColorScheme()
  const buttonVariant = mode === 'light' ? 'outlined' : 'contained'
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
          borderTop: '1px solid #0277BD'
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
          <Button variant={buttonVariant} startIcon={<PersonAddIcon />}>
            invite
          </Button>
          <AvatarGroup
            max={4}
            sx={{
              '& .MuiAvatar-root': {
                width: 34,
                height: 34,
                fontSize: 16
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
