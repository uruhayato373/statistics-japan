import { TimeType, ValueType } from 'utils/e-stat'

/**
 * valuesから年次リストtimesを作成する関数。
 */
function extractTimes(values: ValueType[]): TimeType[] {
  const uniqueTImesMap = new Map<string, string>()

  values.forEach((value) => {
    if (!uniqueTImesMap.has(value.timeCode)) {
      uniqueTImesMap.set(value.timeCode, value.timeName)
    }
  })

  return Array.from(uniqueTImesMap.entries()).map(([timeCode, timeName]) => ({
    timeCode,
    timeName,
  }))
}

export default extractTimes
