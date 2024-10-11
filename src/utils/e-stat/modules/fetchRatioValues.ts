import { calculateRatioValues } from './calculateValues/ratioValues'
import { fetchEstatAPI } from './fetchAPI'
import { formatValues } from './formatResponse/formatValues'

/**
 * 割合を計算して返却する  [例] 可住地面積 / 総面積 (%)
 */
const fetchRatioValues = async (moleculeParams, denominatorParams) => {
  try {
    const [moleculeResponse, denominatorResponse] = await Promise.all([
      fetchEstatAPI(moleculeParams),
      fetchEstatAPI(denominatorParams),
    ])

    const moleculeValues = formatValues(moleculeResponse)
    const denominatorValues = formatValues(denominatorResponse)

    return calculateRatioValues({ moleculeValues, denominatorValues })
  } catch (error) {
    console.error('fetchRatioValues でエラーが発生しました:', error)
    throw new Error('e-Stat API からのデータ取得に失敗しました')
  }
}

export default fetchRatioValues
