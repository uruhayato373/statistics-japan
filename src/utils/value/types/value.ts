/**
 * 統計値の基本型 - すべてのデータはこの型に整形する
 * @property {string} timeCode
 * @property {string} timeName
 * @property {string} areaCode
 * @property {string} areaName
 * @property {string} categoryCode
 * @property {string} categoryName
 * @property {string} unit
 * @property {number} value
 */
export interface ValueType {
  timeCode: string
  timeName: string
  areaCode: string
  areaName: string
  categoryCode: string
  categoryName: string
  categoryUnit?: string
  value: number
  unit?: string
  deviationValue?: number
  rank?: number
}
