import { Box, Typography } from '@mui/material'
import { Fragment } from 'react'

const ScrapingLoader = ({ scraping }: any) => {
  return (
    <Fragment>
      {scraping ? (
        <Box>
          <Typography variant="subtitle1">Scraping...</Typography>
        </Box>
      ) : null}
    </Fragment>
  )
}
export default ScrapingLoader
