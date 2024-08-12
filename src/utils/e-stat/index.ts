import margeDocuments from 'utils/document'

import { fetchEstatAPI } from './fetchAPI'
import { formatEstatAPI } from './formatAPI'
import type { DocumentType, TimeType } from './types/formatted'
import type { EstatParamsType } from './types/params'

export type * from './types/params'
export type * from './types/formatted'

interface HandleEstatAPIResult {
  fetchTimes: () => Promise<TimeType[]>
  fetchDocument: () => Promise<DocumentType>
}

const handleEstatAPI = (
  estatParams: EstatParamsType | EstatParamsType[]
): HandleEstatAPIResult => {
  return {
    fetchTimes: async () => {
      const params = { ...estatParams, cdArea: '00000' } as EstatParamsType
      const response = await fetchEstatAPI(params)
      const { times } = formatEstatAPI(response)
      return times.sort((a, b) => parseInt(b.timeCode) - parseInt(a.timeCode))
    },
    fetchDocument: async () => {
      if (Array.isArray(estatParams)) {
        // 複数のパラメータが渡された場合
        const responses = await Promise.all(estatParams.map(fetchEstatAPI))
        const documents = responses.map(formatEstatAPI)
        return margeDocuments(documents)
      } else {
        // 単一のパラメータが渡された場合
        const response = await fetchEstatAPI(estatParams)
        return formatEstatAPI(response)
      }
    },
  }
}

export default handleEstatAPI
