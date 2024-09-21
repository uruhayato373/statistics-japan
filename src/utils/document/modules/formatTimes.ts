import { ValueType } from 'utils/value'

import { TimeType } from '../types/document'

export function formatTimes(values: ValueType[]): TimeType[] {
  const uniqueMap = new Map<string, TimeType>()

  values.forEach((value) => {
    if (!uniqueMap.has(value.timeCode)) {
      uniqueMap.set(value.timeCode, {
        timeCode: value.timeCode,
        timeName: value.timeName,
      })
    }
  })

  return Array.from(uniqueMap.values())
}

export default formatTimes
