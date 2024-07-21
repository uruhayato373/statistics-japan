import { CategoryType } from '../types/formatted'
import { EStatResponseType } from '../types/response'

/**
 * e-Stat APIのレスポンスからカテゴリデータを整形する関数
 *
 * @param {EStatResponseType} response - e-Stat APIのレスポンス
 * @returns {CategoryType[]} 整形されたカテゴリデータの配列
 * @throws {Error} カテゴリデータが見つからない場合や無効な形式の場合にエラーをスロー
 */
const formatCategories = (response: EStatResponseType): CategoryType[] => {
  const classObj = response.GET_STATS_DATA.STATISTICAL_DATA.CLASS_INF.CLASS_OBJ
  const categories = classObj.find((obj) => obj['@id'] === 'cat01').CLASS

  if (!categories) {
    throw new Error(
      'カテゴリーデータが見つかりません。APIレスポンスを確認してください。'
    )
  }

  // オブジェクトか配列かをチェック
  if (Array.isArray(categories)) {
    // 配列の場合はそのまま返す
    return categories.map((c) => ({
      categoryCode: c['@code'],
      categoryName: c['@name'].replace(`${c['@code']}_`, ''),
    }))
  } else if (typeof categories === 'object' && categories !== null) {
    // オブジェクトの場合は配列に変換して返す
    return [
      {
        categoryCode: categories['@code'],
        categoryName: categories['@name'].replace(
          `${categories['@code']}_`,
          ''
        ),
        categoryUnit: categories['@unit'],
      },
    ]
  } else {
    throw new Error(
      `無効なカテゴリーデータ形式です。受け取ったデータ型: ${typeof categories}`
    )
  }
}

export default formatCategories
