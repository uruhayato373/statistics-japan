import { TimeType } from 'utils/document'
import { EStatResponseType } from 'utils/e-stat/types/response'

const formatTimes = (response: EStatResponseType): TimeType[] => {
  const classObj = response.GET_STATS_DATA.STATISTICAL_DATA.CLASS_INF.CLASS_OBJ
  const timesObj = classObj.find((obj) => obj['@id'] === 'time')
  console.log('timesObj:', timesObj)

  if (!timesObj) {
    return [{ timeCode: null, timeName: null }]
  }

  const times = timesObj.CLASS
  console.log('times:', times)

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
