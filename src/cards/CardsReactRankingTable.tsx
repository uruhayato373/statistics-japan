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
import { CSVExport } from 'components/third-party/react-table'

import { DocumentType } from 'utils/e-stat'
import formatTable from 'utils/table'

interface Props {
  title?: string
  document: DocumentType
  boxHeight?: string
}

export default function CardsReactRankingTable({
  title,
  document,
  boxHeight = '600px',
}: Props) {
  const [selectedTimeCode, setSelectedTimeCode] = useState<string>()

  const { times } = document
  const sortedTimes = times.sort(
    (a, b) => parseInt(b.timeCode) - parseInt(a.timeCode)
  )

  useEffect(() => {
    setSelectedTimeCode(sortedTimes[0]?.timeCode)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleTimeChange = (event: SelectChangeEvent<string>) => {
    const newTime = event.target.value
    setSelectedTimeCode(newTime)
  }

  if (!selectedTimeCode) return <CircularProgressCards />

  const filteredDocument = {
    ...document,
    values: document.values.filter((f) => f.timeCode === selectedTimeCode),
  }

  const contents = formatTable(filteredDocument).reactRankTable()
  const { columns, data } = contents

  const headers = columns.map((column) => {
    return {
      label: column.footer,
      key: column.accessorKey as string,
    }
  })

  const csvData = data.map((d) => {
    return {
      rank: d.rank.toString(),
      areaName: d.areaName,
      tableValue: d.tableValue,
      deviationValue: d.deviationValue.toString(),
    }
  })

  const filename = `${title}.csv`

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
          <CSVExport data={csvData} headers={headers} filename={filename} />
        </Stack>
        <Divider sx={{ mt: 1.5, mb: 1.5 }} />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 1.5 }}
        >
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
        </Stack>
        <PrefectureRankingTable contents={contents} />
      </Box>
    </MainCard>
  )
}