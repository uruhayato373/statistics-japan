'use client'

import { ReactElement, useState } from 'react'

import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import { handlePrefecture } from 'utils/prefecture'

export default function SelectPrefecture(): ReactElement {
  const prefectures = handlePrefecture().fetchItems()
  const [selectedPrefCode, setSelectedPrefCode] = useState<string>('')

  const handleTimeChange = (event: SelectChangeEvent<string>) => {
    const newTime = event.target.value
    setSelectedPrefCode(newTime)
  }

  return (
    <FormControl size="small">
      <Select
        labelId="select-time-label"
        id="select-time"
        value={selectedPrefCode}
        displayEmpty
        onChange={handleTimeChange}
      >
        {prefectures.map((d) => (
          <MenuItem key={d.prefCode} value={d.prefCode}>
            {d.prefName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}