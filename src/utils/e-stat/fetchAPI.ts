import { HttpsProxyAgent } from 'https-proxy-agent'
import fetch from 'node-fetch'

import paramsSerializer from './modules/paramsSerializer'
import { EstatParamsType } from './types/params'
import { EStatResponseType } from './types/response'

const API_KEY = process.env.ESTAT_API_APPID
const BASE_URL = 'https://api.e-stat.go.jp/rest/3.0/app/json/getStatsData'
const PROXY_URL = process.env.HTTP_PROXY

const agent = PROXY_URL ? new HttpsProxyAgent(PROXY_URL) : undefined

/**
 * レスポンスが有効なEStatResponseTypeかどうかをチェックする関数
 *
 * @param {any} data - チェックするデータ
 * @returns {data is EStatResponseType} データが有効な場合はtrue、そうでない場合はfalse
 */
function isValidEStatResponse(data: unknown): data is EStatResponseType {
  return data && typeof data === 'object' && 'GET_STATS_DATA' in data
}

/**
 * e-Stat APIからデータを取得する関数
 *
 * @param {Omit<EstatParamsType, 'appId'>} params - APIリクエストのパラメータ（appidを除く）
 * @returns {Promise<EStatResponseType>} APIレスポンスのPromise
 * @throws {Error} APIリクエストが失敗した場合またはレスポンスが無効な場合にエラーをスロー
 */
export async function fetchEstatAPI(
  params: Omit<EstatParamsType, 'appId'>
): Promise<EStatResponseType> {
  const queryParams: EstatParamsType = {
    appId: API_KEY!,
    ...Object.fromEntries(
      Object.entries(params).map(([key, value]) => [
        key,
        Array.isArray(value) ? value.join(',') : value,
      ])
    ),
  } as EstatParamsType

  const url = `${BASE_URL}?${paramsSerializer(queryParams)}`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      agent,
    })

    if (!response.ok) {
      throw new Error(
        `e-Stat APIリクエストが失敗しました: ${response.status} ${response.statusText}`
      )
    }

    const data = await response.json()

    if (!isValidEStatResponse(data)) {
      throw new Error('e-Stat APIからの応答形式が無効です')
    }

    return data
  } catch (error) {
    console.error('e-Statデータの取得中にエラーが発生しました:', error)
    throw new Error(
      'e-Statデータの取得に失敗しました。詳細はコンソールを確認してください。'
    )
  }
}
