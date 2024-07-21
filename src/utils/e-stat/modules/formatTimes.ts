import { TimeType } from '../types/formatted'
import { EStatResponseType } from '../types/response'

const formatTimes = (response: EStatResponseType): TimeType[] => {
  const classObj = response.GET_STATS_DATA.STATISTICAL_DATA.CLASS_INF.CLASS_OBJ
  const times = classObj.find((obj) => obj['@id'] === 'time').CLASS

  if (!times) {
    throw new Error(
      '年次データが見つかりません。APIレスポンスを確認してください。'
    )
  }

  // オブジェクトか配列かをチェック
  if (Array.isArray(times)) {
    // 配列の場合はそのまま返す
    return times.map((c) => ({
      timeCode: c['@code'].replace('100000', ''),
      timeName: c['@name'],
    }))
  } else if (typeof times === 'object' && times !== null) {
    // オブジェクトの場合は配列に変換して返す
    return [
      {
        timeCode: times['@code'].replace('100000', ''),
        timeName: times['@name'],
      },
    ]
  } else {
    throw new Error(
      `無効な年次データ形式です。受け取ったデータ型: ${typeof times}`
    )
  }
}

export default formatTimes
