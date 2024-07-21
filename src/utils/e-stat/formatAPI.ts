import formatAreas from './modules/formatAreas'
import formatCategories from './modules/formatCategories'
import formatTimes from './modules/formatTimes'
import { DocumentType } from './types/formatted'
import { EStatResponseType } from './types/response'

/**
 * e-Stat APIのレスポンスを整形する関数
 *
 * @param {EStatResponseType} response - e-Stat APIのレスポンス
 * @returns {DocumentType} 整形されたドキュメント
 */
export function formatEstatAPI(response: EStatResponseType): DocumentType {
  const values = response.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE
  const areas = formatAreas(response)
  const times = formatTimes(response)
  const categories = formatCategories(response)

  return {
    values: values.map((v) => {
      return {
        ...categories.find((c) => c.categoryCode === v['@cat01']),
        ...areas.find((a) => a.areaCode === v['@area']),
        ...times.find((t) => t.timeCode === v['@time'].replace('100000', '')),
        unit: v['@unit'],
        value: Number(v['$']),
      }
    }),
    areas,
    times: Array.from(
      new Set(values.map((v) => v['@time'].replace('100000', '')))
    ).map((t) => times.find((time) => time.timeCode === t)),
    categories,
  }
}
