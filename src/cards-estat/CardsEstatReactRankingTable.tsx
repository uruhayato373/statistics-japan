'use client'

import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import CircularProgressCards from 'components/CircularProgressCards'
import MainCard from 'components/MainCard'
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
  const [selectedTimeCode, setSelectedTimeCode] = useState<string>('')

  const sortedTimes = times.sort(
    (a, b) => parseInt(b.timeCode) - parseInt(a.timeCode)
  )

  useEffect(() => {
    setSelectedTimeCode(sortedTimes[0].timeCode)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleTimeChange = (event: SelectChangeEvent<string>) => {
    const newTime = event.target.value
    setSelectedTimeCode(newTime)
  }

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
      <Box sx={{ p: 2, pb: 0, height: boxHeight }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h5" color="text.primary">
            {title}
          </Typography>
        </Stack>
        <Divider sx={{ mt: 1.5, mb: 1.5 }} />
        <FormControl sx={{ minWidth: 80 }} size="small">
          <Select
            labelId="select-time-label"
            id="select-time"
            value={selectedTimeCode}
            displayEmpty
            onChange={handleTimeChange}
          >
            {sortedTimes.map((d) => (
              <MenuItem key={d.timeCode} value={d.timeCode}>
                {d.timeName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <PrefectureRankingTable contents={contents} />
      </Box>
    </MainCard>
  )
}
