import { calculateDivisionValues } from './calculateValues/divisionValues'
import { fetchEstatAPI } from './fetchAPI'
import { formatValues } from './formatResponse/formatValues'

/**
 * 比率を計算して返却する  [例] 人口 / 面積 (人/ha)
 */
const fetchDivisionValues = async (moleculeParams, denominatorParams) => {
  try {
    const [moleculeResponse, denominatorResponse] = await Promise.all([
      fetchEstatAPI(moleculeParams),
      fetchEstatAPI(denominatorParams),
    ])

    const moleculeValues = formatValues(moleculeResponse)
    const denominatorValues = formatValues(denominatorResponse)

    return calculateDivisionValues({ moleculeValues, denominatorValues })
  } catch (error) {
    console.error('fetchDivisionValues でエラーが発生しました:', error)
    throw new Error('e-Stat API からのデータ取得に失敗しました')
  }
}
export default fetchDivisionValues
