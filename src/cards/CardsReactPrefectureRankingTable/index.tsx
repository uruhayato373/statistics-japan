'use client'
import { Suspense, useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import CircularProgressCards from 'components/CircularProgressCards'
import MainCard from 'components/MainCard'
import { CSVExport } from 'components/third-party/react-table'

import { DocumentType } from 'utils/document'
import formatTable from 'utils/table'

import Average from './Average'
import Median from './Median'
import PrefectureRankingTable from './PrefectureRankingTable'
import SelectTime from './SelectTime'

interface Props {
  title?: string
  document: DocumentType
  height?: string
}

export default function CardsReactPrefectureRankingTable({
  title,
  document,
  height,
}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { times } = document
  const [selectedTimeCode, SelectTimeComponent] = SelectTime({ times })

  useEffect(() => {
    if (selectedTimeCode) {
      setIsLoading(true)
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [selectedTimeCode])

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

  const boxStyle = height ? { height } : {}

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <MainCard sx={{ mt: 1 }} content={false}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ p: 2, pb: 0 }}
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
          sx={{ pl: 2 }}
        >
          <SelectTimeComponent />
        </Stack>
        <Box sx={{ p: 2, ...boxStyle }}>
          {isLoading ? (
            <CircularProgressCards />
          ) : (
            <>
              <PrefectureRankingTable document={filteredDocument} />
              <Divider sx={{ mt: 2, mb: 2 }} />
              <Grid container spacing={3}>
                <Grid item xs={12} lg={6}>
                  <Average document={filteredDocument} />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Median document={filteredDocument} />
                </Grid>
              </Grid>
            </>
          )}
        </Box>
      </MainCard>
    </Suspense>
  )
}
