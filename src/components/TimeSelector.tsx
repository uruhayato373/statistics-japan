'use client'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import { TimeType } from 'utils/e-stat'

type Props = {
  times: TimeType[]
  selectedTimeCode: string
  setSelectedTimeCode: (timeCode: string) => void
}

function TimeSelector({ times, selectedTimeCode, setSelectedTimeCode }: Props) {
  const sortedTimes = times.sort(
    (a, b) => parseInt(b.timeCode) - parseInt(a.timeCode)
  )

  const handleTimeChange = (event: SelectChangeEvent<string>) => {
    const newTime = event.target.value
    setSelectedTimeCode(newTime)
  }

  return (
    <>
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
    </>
  )
}

export default TimeSelector
