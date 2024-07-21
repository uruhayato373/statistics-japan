import { fetchEstatAPI } from './fetchAPI'
import { formatEstatAPI } from './formatAPI'
import paramsSerializer from './modules/paramsSerializer'
import type { DocumentType } from './types/formatted'
import type { EstatParamsType } from './types/params'
import { EStatResponseType } from './types/response'

export type * from './types/params'
export type * from './types/formatted'

interface HandleEstatAPIResult {
  fetchAPI: () => Promise<EStatResponseType>
  fetchDocument: () => Promise<DocumentType>
  routesURL: () => string
}

/**
 * e-Stat APIを処理する関数
 *
 * @param {EstatParamsType} estatParams - e-Stat APIリクエストのパラメータ
 *
 * @description e-Stat APIに関する処理はすべてこの関数にまとめる
 *
 */
const handleEstatAPI = (estatParams: EstatParamsType): HandleEstatAPIResult => {
  return {
    /**
     * e-Stat APIから生のレスポンスを取得する
     */
    fetchAPI: async () => await fetchEstatAPI(estatParams),
    /**
     * e-Stat APIからデータを取得し、整形されたドキュメントを返す
     */
    fetchDocument: async () => {
      const response = await fetchEstatAPI(estatParams)
      return formatEstatAPI(response)
    },
    /**
     * API のエンドポイント URL を生成する
     */
    routesURL: () => paramsSerializer(estatParams),
  }
}

export default handleEstatAPI
