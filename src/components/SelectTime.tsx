'use client'
import { useCallback } from 'react'

import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import { time } from 'atoms'
import { TimeType } from 'utils/e-stat'

import { useAtom } from 'jotai'

type Props = {
  times: TimeType[]
}

function SelectTime({ times }: Props) {
  // 年次はJotaiで管理する
  const [selectedTime, setSelectedTime] = useAtom(time)

  // 降順に並び替え
  const sortedTimes = times.sort(
    (a, b) => parseInt(b.timeCode) - parseInt(a.timeCode)
  )

  // 選択した年次をJotaiにセット
  const handleTimeChange = useCallback(
    (newTime: TimeType) => {
      setSelectedTime(newTime)
    },
    [setSelectedTime]
  )

  return (
    <>
      <FormControl sx={{ minWidth: 80 }} size="small">
        <Select
          labelId="select-time-label"
          id="select-time"
          value={selectedTime.timeCode}
          displayEmpty
          onChange={(event: SelectChangeEvent) => {
            const selectedTime = times.find(
              (t) => t.timeCode === event.target.value
            )
            if (selectedTime) {
              handleTimeChange(selectedTime)
            }
          }}
        >
          {sortedTimes.map((d) => (
            <MenuItem key={d.timeCode} value={d.timeCode}>
              {d.timeName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  )
}

export default SelectTime
