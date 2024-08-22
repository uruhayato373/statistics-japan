'use client'
import { Suspense, useCallback, useState } from 'react'

import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import ApexLineChart from 'components/apexcharts/ApexLineChart'
import CircularProgressCards from 'components/CircularProgressCards'
import MainCard from 'components/MainCard'

import { ApexOptions } from 'apexcharts'

import { prefecture } from 'atoms'
import prefectures from 'data/prefecture/prefList.json'
import useEstatAPI from 'hooks/useEstatAPI'
import formatApexcharts from 'utils/apexcharts'
import { EstatParamsType } from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'

import { useAtom } from 'jotai'

interface Props {
  title: string
  estatParams: EstatParamsType
  options?: ApexOptions
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

export default function CardsEstatApexComparisonChart({
  title,
  estatParams,
  options,
}: Props) {
  const [atomPrefecture] = useAtom<PrefectureType>(prefecture)
  const [selectedPrefCodes, setSelectedPrefCodes] = useState<string[]>([
    atomPrefecture.prefCode,
  ])
  const [isSelectOpen, setIsSelectOpen] = useState(false)

  const prefCodeMap = prefectures.reduce(
    (acc, pref) => {
      acc[pref.prefCode] = pref.prefName
      return acc
    },
    {} as Record<string, string>
  )

  const handleChange = useCallback((event: SelectChangeEvent<string[]>) => {
    const { value } = event.target
    setSelectedPrefCodes(typeof value === 'string' ? value.split(',') : value)
  }, [])

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
            label={prefCodeMap[prefCode]}
            variant="filled"
            color="primary"
            size="small"
          />
        ))}
      </Box>
    )
  }

  const { document } = useEstatAPI({
    ...estatParams,
    cdArea: selectedPrefCodes,
  })

  const formatOptions = formatApexcharts(document).AxisTimeChart('area')
  const customOptions = { ...formatOptions, ...options }

  const unit = document.categories[0].categoryUnit
  const units = selectedPrefCodes.map(() => unit)

  return (
    <MainCard sx={{ mt: 1 }} content={false}>
      <Box
        sx={{
          p: 2,
          pb: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Suspense fallback={<CircularProgressCards />}>
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
          {customOptions && (
            <ApexLineChart options={customOptions} units={units} />
          )}
        </Suspense>
      </Box>
    </MainCard>
  )
}
