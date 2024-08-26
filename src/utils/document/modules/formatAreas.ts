import { AreaType, ValueType } from '../types/document'

/**
 * valuesから地域リストareasを作成する関数。
 *
 * 与えられた値の配列からの重複のない地域情報を抽出。
 * 同じ地域コードを持つ複数の項目の場合、最初に出現したものを使用。
 *
 * @example
 * // 結果: [{ areaCode: '01000', areaName: '北海道' }, { areaCode: '02000', areaName: '青森県' }]
 */
function formatAreas(values: ValueType[]): AreaType[] {
  const uniqueAreasMap = new Map<string, string>()

  values.forEach((value) => {
    if (!uniqueAreasMap.has(value.areaCode)) {
      uniqueAreasMap.set(value.areaCode, value.areaName)
    }
  })

  return Array.from(uniqueAreasMap.entries()).map(([areaCode, areaName]) => ({
    areaCode,
    areaName,
  }))
}

export default formatAreas
