'use client'

import { useCallback, useMemo, useState } from 'react'

import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Typography from '@mui/material/Typography'

import { useAtom } from 'jotai'

import { prefecture } from 'atoms'
import prefectures from 'data/prefecture/prefList.json'
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

export default function SelectPrefCodes(): [string[], () => JSX.Element] {
  const [atomPrefecture] = useAtom<PrefectureType>(prefecture)
  const [selectedPrefCodes, setSelectedPrefCodes] = useState<string[]>([
    atomPrefecture.prefCode,
  ])
  const [isSelectOpen, setIsSelectOpen] = useState(false)

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

  return [
    selectedPrefCodes,
    () => (
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
    ),
  ]
}
