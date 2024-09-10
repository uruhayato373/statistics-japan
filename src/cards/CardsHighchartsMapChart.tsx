'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import CircularProgressCards from 'components/CircularProgressCards'
import HighchartsMapChart from 'components/highcharts/HighchartsMapChart'
import MainCard from 'components/MainCard'

import ExportOutlined from '@ant-design/icons/ExportOutlined'

import { DocumentType } from 'utils/document'
import { TopoJSONData } from 'utils/geoshape'
import formatHighcharts from 'utils/highcharts'

interface Props {
  title?: string
  document: DocumentType
  topojson: TopoJSONData
  height?: string
}

export default function CardsHighchartsMapChart({
  title,
  document,
  topojson,
  height,
}: Props) {
  const [selectedTimeCode, setSelectedTimeCode] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { times } = document
  const sortedTimes = times.sort(
    (a, b) => parseInt(b.timeCode) - parseInt(a.timeCode)
  )

  useEffect(() => {
    setSelectedTimeCode(sortedTimes[0].timeCode)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (selectedTimeCode) {
      setIsLoading(true)
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1000) // 1秒間 CircularProgress を表示

      return () => clearTimeout(timer)
    }
  }, [selectedTimeCode])

  const handleTimeChange = (event: SelectChangeEvent<string>) => {
    const newTime = event.target.value
    setSelectedTimeCode(newTime)
  }

  const filteredDocument = {
    ...document,
    values: document.values.filter((f) => f.timeCode === selectedTimeCode),
  }

  const formatOptions = formatHighcharts(filteredDocument).mapChart(topojson)

  const boxStyle = height ? { height } : {}

  return (
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
        <Tooltip title="都道府県のデータを見る">
          <IconButton
            rel="noopener noreferrer"
            size="small"
            sx={{
              border: '0.5px solid',
              borderColor: 'grey.400',
              '&:hover': { bgcolor: 'transparent' },
            }}
          >
            <ExportOutlined />
          </IconButton>
        </Tooltip>
      </Stack>
      <Divider sx={{ mt: 1.5, mb: 1.5 }} />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ pl: 2 }}
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
      <Box sx={{ p: 2, ...boxStyle }}>
        {isLoading ? (
          <CircularProgressCards />
        ) : (
          <>
            <HighchartsMapChart options={formatOptions} />
            <Typography variant="caption" color="text.secondary">
              地図は『
              <Link
                href="https://geoshape.ex.nii.ac.jp/city/choropleth/jp_pref.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                歴史的行政区域データセットβ版
              </Link>
              』（CODH作成）を利用
            </Typography>
          </>
        )}
      </Box>
    </MainCard>
  )
}
