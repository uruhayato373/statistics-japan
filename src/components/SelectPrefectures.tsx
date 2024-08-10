/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
'use client'
import { useState, useEffect, useMemo, useCallback } from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Typography from '@mui/material/Typography'

import { PrefectureType } from 'utils/prefecture'

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

interface Props {
  prefectures: PrefectureType[]
}

export default function SelectPrefectures({ prefectures }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [selectedPrefCodes, setSelectedPrefCodes] = useState<string[]>([])
  const [isSelectOpen, setIsSelectOpen] = useState(false)

  const prefCodeMap = useMemo(() => {
    return prefectures.reduce(
      (acc, pref) => {
        acc[pref.prefCode] = pref.prefName
        return acc
      },
      {} as Record<string, string>
    )
  }, [prefectures])

  useEffect(() => {
    const areaCodes = searchParams.getAll('areaCode')
    setSelectedPrefCodes(areaCodes)
  }, [searchParams])

  const updateURL = useCallback(() => {
    const params = new URLSearchParams(searchParams)
    params.delete('areaCode')
    selectedPrefCodes.forEach((code) => params.append('areaCode', code))
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }, [selectedPrefCodes, pathname, router, searchParams])

  const handleChange = useCallback((event: SelectChangeEvent<string[]>) => {
    const { value } = event.target
    setSelectedPrefCodes(typeof value === 'string' ? value.split(',') : value)
  }, [])

  const handleClose = useCallback(() => {
    setIsSelectOpen(false)
    updateURL()
  }, [updateURL])

  const renderValue = useCallback(
    (selected: string[]) => {
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
    },
    [prefCodeMap]
  )

  return (
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
  )
}
