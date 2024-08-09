import { useMemo } from 'react'

import useSWRImmutable from 'swr'

import margeDocuments from 'utils/document'
import { EstatParamsType, DocumentType } from 'utils/e-stat'
import paramsSerializer from 'utils/e-stat/modules/paramsSerializer'
import fetcher from 'utils/fetcher'

/**
 * e-Stat APIからのレスポンスの型定義
 * @interface EstatAPIResponse
 */
interface EstatAPIResponse {
  document: DocumentType | null
  isLoading: boolean
  isError: Error | undefined
}

/**
 * 二つのe-Stat APIを呼び出し、結果を結合するカスタムフック
 *
 * @param paramsArray - e-Stat APIのパラメータの配列（要素数は2つ）
 * @returns EstatAPIResponseオブジェクト
 * @description
 * useEstatAPIと統合して、paramsが配列かどうかによって処理を分けることを考えたが、
 * useSWRは条件分岐内で使用することができないため、別のカスタムフックとして実装した。
 * paramsArrayの要素数は2つであることを前提としている。
 *
 */
export default function useEstatAPIs(
  paramsArray: EstatParamsType[],
  mergeType: string = 'flat'
): EstatAPIResponse {
  // パラメータ配列の要素数をチェック
  if (paramsArray.length !== 2) {
    throw new Error('パラメータの配列の要素数が2つではありません。')
  }

  // URLの配列を生成
  const urls = useMemo(
    () =>
      paramsArray.map((params) => `/api/e-stat?${paramsSerializer(params)}`),
    [paramsArray]
  )

  // SWRを使用してデータをフェッチ
  const { data, error } = useSWRImmutable<DocumentType[], Error>(
    urls,
    (urls) => Promise.all(urls.map((url: string) => fetcher(url))),
    { suspense: true }
  )

  return {
    document: data ? margeDocuments(data, mergeType) : null,
    isLoading: !data && !error,
    isError: error,
  }
}
