import useSWR, { SWRResponse } from 'swr'

import { EstatParamsType, DocumentType } from 'utils/e-stat'
import paramsSerializer from 'utils/e-stat/modules/paramsSerializer'
import fetcher from 'utils/fetcher'

interface EstatAPIResponse {
  document: DocumentType | undefined
  isLoading: boolean
  isError: Error | undefined
}

export default function useEstatAPI(params: EstatParamsType): EstatAPIResponse {
  const url = `/api/e-stat?${paramsSerializer(params)}`

  const { data, error }: SWRResponse<DocumentType, Error> = useSWR(
    url,
    fetcher,
    { suspense: true }
  )

  return {
    document: data,
    isLoading: !error && !data,
    isError: error,
  }
}
