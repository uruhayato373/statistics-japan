import { EstatParamsType } from '../types/params'

/**
 * e-Stat APIのパラメータをURLクエリ文字列にシリアライズする関数
 *
 * @param {EstatParamsType} params - シリアライズするe-Stat APIパラメータオブジェクト
 * @returns {string} URLエンコードされたクエリ文字列
 *
 * @example
 * const params = {
 *   statsDataId: '0003348423',
 *   cdCat01: ['A', 'B', 'C'],
 *   limit: 10
 * };
 * const queryString = paramsSerializer(params);
 * // 結果: 'statsDataId=0003348423&cdCat01=A%2CB%2CC&limit=10'
 *
 * @remarks
 * - 配列値はカンマ区切りの文字列に変換されます。
 * - 全てのキーと値はURIエンコードされます。
 * - EstatParamsType で定義された型に基づいてパラメータを処理します。
 * - 空の配列や undefined 値の処理は、EstatParamsType の定義に依存します。
 */
const paramsSerializer = (params: EstatParamsType) => {
  return Object.entries(params)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}=${encodeURIComponent(value.join(','))}`
      } else {
        return `${key}=${encodeURIComponent(value)}`
      }
    })
    .join('&')
}

export default paramsSerializer
