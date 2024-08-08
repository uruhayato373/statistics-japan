import { useMemo } from 'react'

import useSWRImmutable from 'swr'

import { EstatParamsType, DocumentType } from 'utils/e-stat'
import paramsSerializer from 'utils/e-stat/modules/paramsSerializer'
import fetcher from 'utils/fetcher'

/**
 * e-Stat APIからのレスポンスの型定義
 * @interface EstatAPIResponse
 */
interface EstatAPIResponse {
  documents: DocumentType[] | []
  isLoading: boolean
  isError: Error | undefined
}

export default function useEstatAPIs(
  paramsArray: EstatParamsType[]
): EstatAPIResponse {
  const urls = useMemo(
    () =>
      paramsArray.map((params) => `/api/e-stat?${paramsSerializer(params)}`),
    [paramsArray]
  )

  const { data, error } = useSWRImmutable<DocumentType[], Error>(
    urls,
    (urls) => Promise.all(urls.map((url: string) => fetcher(url))),
    { suspense: true }
  )

  return {
    documents: data ? data.flat() : [],
    isLoading: !data && !error,
    isError: error,
  }
}
