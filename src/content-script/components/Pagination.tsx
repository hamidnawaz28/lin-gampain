import { Box, Pagination } from '@mui/material'
import SplitButton from './SplitButton'
const ProfileCard = ({ page, handleChangePage, rowsPerPage, handleChangeRowsPerPage }: any) => {
  return (
    <Box>
      <Pagination count={10} variant="outlined" shape="rounded" />
      <SplitButton></SplitButton>
    </Box>
  )
}
export default ProfileCard
