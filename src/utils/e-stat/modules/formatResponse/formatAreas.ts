import { AreaType } from 'utils/document'
import { EStatResponseType } from 'utils/e-stat/types/response'

/**
 * e-Stat APIのレスポンスから地域データを整形する関数
 *
 * @param {EStatResponseType} response - e-Stat APIのレスポンス
 * @returns {AreaType[]} 整形された地域データの配列
 * @throws {Error} 地域データが見つからない場合や無効な形式の場合にエラーをスロー
 */
const formatAreas = (response: EStatResponseType): AreaType[] => {
  const classObj = response.GET_STATS_DATA.STATISTICAL_DATA.CLASS_INF.CLASS_OBJ
  const areas = classObj.find((obj) => obj['@id'] === 'area').CLASS

  if (!areas) {
    throw new Error(
      '地域データが見つかりません。APIレスポンスを確認してください。'
    )
  }

  // オブジェクトか配列かをチェック
  if (Array.isArray(areas)) {
    // 配列の場合はそのまま返す
    return areas.map((c) => ({
      areaCode: c['@code'],
      areaName: c['@name'],
    }))
  } else if (typeof areas === 'object' && areas !== null) {
    // オブジェクトの場合は配列に変換して返す
    return [
      {
        areaCode: areas['@code'],
        areaName: areas['@name'],
      },
    ]
  } else {
    throw new Error(
      `無効な地域データ形式です。受け取ったデータ型: ${typeof areas}`
    )
  }
}

export default formatAreas
