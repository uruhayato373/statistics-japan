'use client'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import CircularProgressCards from 'components/CircularProgressCards'
import MainCard from 'components/MainCard'
import SelectTime from 'components/select/SelectTime'
import PrefectureRankingTable from 'components/table/PrefectureRankingTable'

import useEstatAPI from 'hooks/useEstatAPI'
import { TimeType } from 'utils/document'
import { EstatParamsType } from 'utils/e-stat'
import formatTable from 'utils/table'

interface Props {
  title: string
  estatParams: EstatParamsType
  times: TimeType[]
  boxHeight?: string
}

export default function CardsEstatReactRankingTable({
  title,
  estatParams,
  times,
  boxHeight = '600px',
}: Props) {
  const [selectedTimeCode, SelectTimeComponent] = SelectTime({ times })

  const { document } = useEstatAPI({
    ...estatParams,
    cdTime: selectedTimeCode ? `${selectedTimeCode}100000` : '',
  })

  if (!selectedTimeCode) {
    return <CircularProgressCards />
  }

  const contents = formatTable(document).reactRankTable()

  return (
    <MainCard sx={{ mt: 1 }} content={false}>
      <Box
        sx={{
          p: 2,
          pb: 0,
          height: boxHeight,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h5" color="text.primary">
          {title}
        </Typography>
        <Divider sx={{ mb: 1.5 }} />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 1.5 }}
        >
          <SelectTimeComponent />
        </Stack>
        <PrefectureRankingTable contents={contents} />
      </Box>
    </MainCard>
  )
}
