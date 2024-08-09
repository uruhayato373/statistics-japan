'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import { TimeType } from 'utils/e-stat'

type Props = {
  times: TimeType[]
}

function SelectTime({ times }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  // 降順に並び替え
  const sortedTimes = times.sort(
    (a, b) => parseInt(b.timeCode) - parseInt(a.timeCode)
  )

  const handleTimeChange = (event: SelectChangeEvent<string>) => {
    const newTime = event.target.value
    router.push(`${pathname}?timeCode=${newTime}`)
  }

  const selectedTimeCode =
    searchParams.get('timeCode') || sortedTimes[0].timeCode

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

export default SelectTime
