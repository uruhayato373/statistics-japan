import margeDocuments from 'utils/document'

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
  fetchDocuments: () => Promise<DocumentType>
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
const handleEstatAPI = (
  estatParams: EstatParamsType | EstatParamsType[]
): HandleEstatAPIResult => {
  return {
    /**
     * e-Stat APIから生のレスポンスを取得する
     */
    fetchAPI: async () => await fetchEstatAPI(estatParams as EstatParamsType),
    /**
     * 一つのe-Stat APIからデータを取得し、整形されたドキュメントを返す
     */
    fetchDocument: async () => {
      const response = await fetchEstatAPI(estatParams as EstatParamsType)
      return formatEstatAPI(response)
    },
    /**
     * 二つのe-Stat APIからデータを取得し、整形されたドキュメントを返す
     */
    fetchDocuments: async () => {
      const response0 = await fetchEstatAPI(estatParams[0])
      const response1 = await fetchEstatAPI(estatParams[0])
      const document0 = formatEstatAPI(response0)
      const document1 = formatEstatAPI(response1)
      return margeDocuments([document0, document1])
    },
    /**
     * API のエンドポイント URL を生成する
     */
    routesURL: () => paramsSerializer(estatParams as EstatParamsType),
  }
}

export default handleEstatAPI
