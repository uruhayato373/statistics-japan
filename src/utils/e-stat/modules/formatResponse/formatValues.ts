import { ValueType } from 'utils/document'

import { EStatResponseType } from '../../types/response'

import formatAreas from './formatAreas'
import formatCategories from './formatCategories'
import formatTimes from './formatTimes'

/**
 * e-Stat APIのレスポンスからValueデータを整形する関数
 */
export function formatValues(response: EStatResponseType): ValueType[] {
  const values = response.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE
  const areas = formatAreas(response)
  const times = formatTimes(response)
  const categories = formatCategories(response)

  return values.map((value) => {
    return {
      ...categories.find((c) => c.categoryCode === value['@cat01']),
      ...areas.find((a) => a.areaCode === value['@area']),
      ...times.find((t) => t.timeCode === value['@time'].replace('100000', '')),
      unit: value['@unit'],
      value: Number(value['$']),
    }
  })
}
