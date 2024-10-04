import { ValueType } from 'utils/value'
import { RankingValueType } from 'utils/value/modules/calcRankingValues'

/**
 * 統計値の年次
 * @property {string} timeCode - 2000, 2005, 2010, 2015, 2020
 * @property {string} timeName - 2000年度, 2005年度, 2010年度, 2015年度, 2020年度
 */
export interface TimeType {
  timeCode: string
  timeName: string
}

/**
 * 統計値のカテゴリ区分
 * @property {string} categoryCode - コード
 * @property {string} categoryName - 名称（総人口、男性、女性 etc）
 */
export interface CategoryType {
  categoryCode: string
  categoryName: string
  categoryUnit?: string
  type?: string
  yAxis?: number
  color?: string
}

/**
 * 統計値の地域区分 - 都道府県も市区町村も同じ型
 * @property {string} areaCode - 地域コード 28000,01100,01101 etc
 * @property {string} areaName - 地域名 兵庫県, 北海道, 北海道札幌市 etc
 */
export interface AreaType {
  areaCode: string
  areaName: string
}

export interface DocumentType {
  times: TimeType[]
  categories: CategoryType[]
  areas: AreaType[]
  values: ValueType[]
}

export interface RankingDocumentType {
  times: TimeType[]
  categories: CategoryType[]
  areas: AreaType[]
  values: RankingValueType[]
}

export type TimesKindType = 'all' | 'common'
