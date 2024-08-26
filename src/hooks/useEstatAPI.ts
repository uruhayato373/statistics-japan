import useSWR, { SWRResponse } from 'swr'

import { DocumentType } from 'utils/document'
import { EstatParamsType } from 'utils/e-stat'
import paramsSerializer from 'utils/e-stat/modules/paramsSerializer'
import fetcher from 'utils/fetcher'

/**
 * e-Stat APIからのレスポンスの型定義
 * @interface EstatAPIResponse
 */
interface EstatAPIResponse {
  /** 取得したドキュメントデータ */
  document: DocumentType | undefined
  /** データ取得中かどうかを示すフラグ */
  isLoading: boolean
  /** エラーオブジェクト（エラーが発生した場合） */
  isError: Error | undefined
}

/**
 * e-Stat APIを使用してデータを取得するカスタムフック
 * @param {EstatParamsType} params - APIリクエストのパラメータ
 * @returns {EstatAPIResponse} 取得したデータ、ローディング状態、エラー状態を含むオブジェクト
 */
export default function useEstatAPI(params: EstatParamsType): EstatAPIResponse {
  // パラメータをシリアライズしてURLを生成
  const url = `/api/e-stat?${paramsSerializer(params)}`

  // SWRを使用してデータをフェッチ
  const { data, error }: SWRResponse<DocumentType, Error> = useSWR(
    url,
    fetcher,
    { suspense: true } // Suspenseモードを有効化
  )

  return {
    document: data,
    isLoading: !error && !data, // データもエラーもない場合はローディング中
    isError: error,
  }
}
