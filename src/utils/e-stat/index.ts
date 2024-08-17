import mergeDocuments from 'utils/document'

import { fetchEstatAPI } from './fetchAPI'
import { formatEstatAPI } from './formatAPI'
import type { DocumentType, TimeType } from './types/formatted'
import type { EstatParamsType } from './types/params'

export type * from './types/params'
export type * from './types/formatted'

interface HandleEstatAPIResult {
  fetchTimes: () => Promise<TimeType[]>
  fetchDocument: (type?: string) => Promise<DocumentType>
}

const handleEstatAPI = (
  estatParams: EstatParamsType | EstatParamsType[]
): HandleEstatAPIResult => {
  return {
    fetchTimes: async () => {
      if (Array.isArray(estatParams)) {
        // 複数のパラメータが渡された場合
        const params = estatParams.map((d) => ({ ...d, cdArea: '00000' }))
        const responses = await Promise.all(params.map(fetchEstatAPI))
        const documents = responses.map(formatEstatAPI)
        const times = mergeDocuments(documents).times
        return times.sort((a, b) => parseInt(b.timeCode) - parseInt(a.timeCode))
      } else {
        // 単一のパラメータが渡された場合
        const params = { ...estatParams, cdArea: '00000' } as EstatParamsType
        const response = await fetchEstatAPI(params)
        const { times } = formatEstatAPI(response)
        return times.sort((a, b) => parseInt(b.timeCode) - parseInt(a.timeCode))
      }
    },
    fetchDocument: async (type: 'flat' | 'ratio' = 'flat') => {
      if (Array.isArray(estatParams)) {
        // 複数のパラメータが渡された場合
        const responses = await Promise.all(estatParams.map(fetchEstatAPI))
        const documents = responses.map(formatEstatAPI)
        return mergeDocuments(documents, type)
      } else {
        // 単一のパラメータが渡された場合
        const response = await fetchEstatAPI(estatParams)
        return formatEstatAPI(response)
      }
    },
  }
}

export default handleEstatAPI
