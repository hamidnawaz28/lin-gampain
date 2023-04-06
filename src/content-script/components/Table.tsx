import { Box, TablePagination } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useEffect, useState } from 'react'
function DataTableRef({ headers, data }: any) {
  const display = true
  return display ? (
    <TableContainer component={Paper}>
      <Table sx={{ width: '100%' }}>
        <TableHead>
          <TableRow>
            {headers.map((el: any, id: number) => {
              return (
                <TableCell align="center" key={id}>
                  {el.label}
                </TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: any, id: number) => (
            <TableRow key={id}>
              {headers.map((el: any, key: number) => {
                return (
                  <TableCell align="center" key={key}>
                    {el?.valMap ? el.valMap(row[el.value]) : row[el.value]}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : null
}

const DataTable = ({ headers, data }: any) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [filteredData, setFilteredData] = useState([])

  const handleChangePage = (e: any, value: any) => {
    setPage(Number(value))
  }

  const handleChangeRowsPerPage = (e: any) => {
    setRowsPerPage(Number(e.target.value))
  }

  useEffect(() => {
    setPage(0)
  }, [rowsPerPage])

  useEffect(() => {
    const filteredData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    setFilteredData(filteredData)
  }, [page, rowsPerPage])

  return (
    <Box>
      <DataTableRef headers={headers} data={filteredData} />
      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[3, 5, 25, 100, 500]}
      />
    </Box>
  )
}
export default DataTable
