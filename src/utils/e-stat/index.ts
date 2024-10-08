import { ValueType } from 'utils/value'

import { calculateDivisionValues } from './modules/calculateValues/divisionValues'
import { calculateRatioValues } from './modules/calculateValues/ratioValues'
import { fetchEstatAPI } from './modules/fetchAPI'
import { formatValues } from './modules/formatResponse/formatValues'
import type { EstatParamsType } from './types/params'
import { EStatResponseType } from './types/response'

export type * from './types/params'

interface HandleEstatAPIResult {
  fetchResponses: (
    estatParams: EstatParamsType | EstatParamsType[]
  ) => Promise<EStatResponseType | EStatResponseType[]>
  fetchValues: (
    estatParams: EstatParamsType | EstatParamsType[],
    categoryKey?: string
  ) => Promise<ValueType[]>
  fetchDivisionValues: (
    moleculeParams: EstatParamsType,
    denominatorParams: EstatParamsType
  ) => Promise<ValueType[]>
  fetchRatioValues: (
    moleculeParams: EstatParamsType,
    denominatorParams: EstatParamsType
  ) => Promise<ValueType[]>
}

const handleEstatAPI = (): HandleEstatAPIResult => {
  return {
    /**
     * responseをそのまま返却する
     */
    fetchResponses: async (estatParams) => {
      if (Array.isArray(estatParams)) {
        const responses = await Promise.all(estatParams.map(fetchEstatAPI))
        return responses
      } else {
        const response = await fetchEstatAPI(estatParams)
        return response
      }
    },
    /**
     * valuesを取得して返却する
     */
    fetchValues: async (estatParams, categoryKey = 'cat01') => {
      if (Array.isArray(estatParams)) {
        const responses = await Promise.all(estatParams.map(fetchEstatAPI))
        const valuesArray = responses.map((response) =>
          formatValues(response, categoryKey)
        )
        return valuesArray.flat()
      } else {
        const response = await fetchEstatAPI(estatParams)
        const values = formatValues(response, categoryKey)
        return values
      }
    },
    /**
     * 比率を計算して返却する  [例] 人口 / 面積 (人/ha)
     */
    fetchDivisionValues: async (moleculeParams, denominatorParams) => {
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
    },
    /**
     * 割合を計算して返却する  [例] 可住地面積 / 総面積 (%)
     */
    fetchRatioValues: async (moleculeParams, denominatorParams) => {
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
    },
  }
}

export default handleEstatAPI
