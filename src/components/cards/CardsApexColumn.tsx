/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import ApexColumnChart from 'components/apexcharts/ApexColumnChart'
import MainCard from 'components/MainCard'

import formatApexcharts from 'utils/apexcharts'

type Props = {
  title: string
  document: DocumentType
}

export default function CardsApexColumn({ title, document }: Props) {
  // Apexcharts用にデータを整形する。
  const apexchart = formatApexcharts(document).TimeChart()

  return (
    <MainCard content={false}>
      <Stack>
        <List sx={{ p: 0, '& .MuiListItemButton-root': { pt: 2, pb: 0 } }}>
          <ListItemButton
            sx={{ '&:hover': { bgcolor: 'transparent' }, cursor: 'text' }}
          >
            <ListItemText
              primary={<Typography variant="subtitle1">{title}</Typography>}
            />
          </ListItemButton>
        </List>
        <Box sx={{ pr: 2 }}>
          <ApexColumnChart contents={apexchart} />
        </Box>
      </Stack>
    </MainCard>
  )
}
