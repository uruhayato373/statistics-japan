import { CategoryType, DocumentType } from 'utils/document'

/**
 * D3チャートのマップ用コンテンツの型定義
 * @interface D3ChartMapContentsType
 */
export interface D3ChartMapContentsType {
  /** カテゴリー情報の配列 */
  categories: CategoryType[]
  /** 地域ごとのデータ配列 */
  series: {
    /** 地域コード */
    areaCode: string
    /** 地域名 */
    areaName: string
    /** 統計値 */
    value: number
    /** 単位 */
    unit: string
  }[]
}

/**
 * DocumentTypeのデータをD3チャートのマップ用に整形する関数
 * @param {DocumentType} document - e-Statから取得した生のデータ
 * @returns {D3ChartMapContentsType} D3チャートのマップ用に整形されたデータ
 */
const formatD3chartsMap = (document: DocumentType): D3ChartMapContentsType => {
  const { values, categories } = document

  // 全国の統計値（areaCode: '00000'）を除外し、必要なプロパティのみマッピング
  const series = values
    .filter((f) => f.areaCode !== '00000')
    .map((d) => ({
      areaCode: d.areaCode,
      areaName: d.areaName,
      value: d.value,
      unit: d.unit,
    }))

  return {
    categories,
    series,
  }
}

export default formatD3chartsMap
