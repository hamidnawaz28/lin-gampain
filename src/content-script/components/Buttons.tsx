import { Add, Delete, Edit } from '@mui/icons-material'
import { Box } from '@mui/material'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
function AddIconButton({ onClick }: any) {
  return (
    <IconButton aria-label="delete" onClick={onClick} sx={{ width: 20 }}>
      <Add color="primary" fontSize={'small'} />
    </IconButton>
  )
}

function EditIconButton({ onClick }: any) {
  return (
    <IconButton aria-label="delete" onClick={onClick} sx={{ width: 20 }}>
      <Edit color="primary" fontSize={'small'} />
    </IconButton>
  )
}
function DeleteIconButton({ onClick }: any) {
  return (
    <IconButton aria-label="delete" onClick={onClick} sx={{ width: 20 }}>
      <Delete color="primary" fontSize={'small'} />
    </IconButton>
  )
}

function ActionButton({ label, onClick }: any) {
  return (
    <Box
      sx={{
        pt: 1,
        pb: 1,
      }}
    >
      <Button aria-label="delete" onClick={onClick} variant="contained" size="small">
        {label}
      </Button>
    </Box>
  )
}
export { AddIconButton, EditIconButton, DeleteIconButton, ActionButton }
