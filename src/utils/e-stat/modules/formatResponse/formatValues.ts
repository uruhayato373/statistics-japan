import { ValueType } from 'utils/value'

import { EStatResponseType } from '../../types/response'

import formatAreas from './formatAreas'
import formatCategories from './formatCategories'
import formatTimes from './formatTimes'

/**
 * e-Stat APIのレスポンスからValueデータを整形する関数
 */
export function formatValues(
  response: EStatResponseType,
  categoryKey: string = 'cat01'
): ValueType[] {
  const values = response.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE
  const areas = formatAreas(response)
  const times = formatTimes(response)
  const categories = formatCategories(response, categoryKey)

  return values.map((value) => {
    const timeData = value['@time']
      ? times.find((t) => t.timeCode === value['@time'].replace('100000', ''))
      : { timeCode: null, timeName: null }
    const areaData = value['@area']
      ? areas.find((a) => a.areaCode === value['@area'])
      : { areaCode: null, areaName: null }
    const categoryData = categories.find(
      (c) => c.categoryCode === value[`@${categoryKey}`]
    )
    return {
      ...categoryData,
      ...areaData,
      ...timeData,
      unit: value['@unit'],
      value: Number(value['$']),
    }
  })
}
