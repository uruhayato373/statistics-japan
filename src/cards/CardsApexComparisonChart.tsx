'use client'
import { useCallback, useState, useMemo } from 'react'

import {
  Stack,
  Box,
  Divider,
  Typography,
  SelectChangeEvent,
  Chip,
  FormControl,
  Select,
  OutlinedInput,
  MenuItem,
} from '@mui/material'

import ApexLineChart from 'components/apexcharts/ApexLineChart'
import MainCard from 'components/MainCard'

import { ApexOptions } from 'apexcharts'

import { prefecture } from 'atoms'
import prefectures from 'data/prefecture/prefList.json'
import formatApexcharts from 'utils/apexcharts'
import { DocumentType } from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'

import { useAtom } from 'jotai'

interface Props {
  title?: string
  document: DocumentType
  options?: ApexOptions
  boxHeight?: string
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

export default function CardsReactRankingTable({
  title,
  document,
  options,
  boxHeight = '600px',
}: Props) {
  const [atomPrefecture] = useAtom<PrefectureType>(prefecture)
  const [selectedPrefCodes, setSelectedPrefCodes] = useState<string[]>([
    atomPrefecture.prefCode,
  ])
  const [isSelectOpen, setIsSelectOpen] = useState(false)

  // useEffect(() => {
  //   if (selectedPrefCodes.length === 0) {
  //     setSelectedPrefCodes([atomPrefecture.prefCode])
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  const prefCodeMap = useMemo(() => {
    return prefectures.reduce(
      (acc, pref) => {
        acc[pref.prefCode] = pref.prefName
        return acc
      },
      {} as Record<string, string>
    )
  }, [])

  const handleChange = useCallback(
    (event: SelectChangeEvent<typeof selectedPrefCodes>) => {
      const {
        target: { value },
      } = event
      setSelectedPrefCodes(typeof value === 'string' ? value.split(',') : value)
    },
    []
  )

  const handleClose = useCallback(() => {
    setIsSelectOpen(false)
  }, [])

  const renderValue = (selected: string[]) => {
    if (selected.length === 0) {
      return <Typography color="text.secondary">都道府県を選択</Typography>
    }
    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {selected.map((prefCode) => (
          <Chip
            key={prefCode}
            label={prefCodeMap[prefCode] || '不明'}
            variant="filled"
            color="primary"
            size="small"
          />
        ))}
      </Box>
    )
  }

  const filteredDocument = useMemo(() => {
    return {
      ...document,
      areas: document.areas.filter((area) =>
        selectedPrefCodes.includes(area.areaCode)
      ),
      values: document.values.filter((value) =>
        selectedPrefCodes.includes(value.areaCode)
      ),
    }
  }, [document, selectedPrefCodes])

  const formatOptions = useMemo(() => {
    if (
      filteredDocument.areas.length === 0 ||
      filteredDocument.values.length === 0
    ) {
      return null
    }
    return formatApexcharts(filteredDocument).AxisTimeChart('area')
  }, [filteredDocument])

  const customOptions = useMemo(() => {
    if (!formatOptions) return null
    return { ...formatOptions, ...options }
  }, [formatOptions, options])

  const unit = document.categories[0]?.categoryUnit ?? ''
  const units = selectedPrefCodes.map(() => unit)

  return (
    <MainCard sx={{ mt: 1 }} content={false}>
      <Box
        sx={{
          p: 2,
          pb: 0,
          display: 'flex',
          flexDirection: 'column',
          height: boxHeight,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 1.5 }}
        >
          <Typography variant="h5" color="text.primary">
            {title}
          </Typography>
          <FormControl sx={{ minWidth: 80 }} size="small">
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={selectedPrefCodes}
              onChange={handleChange}
              onClose={handleClose}
              open={isSelectOpen}
              onOpen={() => setIsSelectOpen(true)}
              input={
                <OutlinedInput
                  id="select-multiple-chip"
                  placeholder="都道府県を選択"
                />
              }
              renderValue={renderValue}
              displayEmpty
              MenuProps={MenuProps}
            >
              {prefectures.map(({ prefCode, prefName }) => (
                <MenuItem key={prefCode} value={prefCode}>
                  {prefName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <Divider sx={{ mb: 1.5 }} />
        {customOptions ? (
          <ApexLineChart options={customOptions} units={units} />
        ) : (
          <Typography>データが選択されていません</Typography>
        )}
      </Box>
    </MainCard>
  )
}
