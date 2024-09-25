import { HttpsProxyAgent } from 'https-proxy-agent'
import fetch, {
  Response as NodeFetchResponse,
  RequestInit as NodeFetchRequestInit,
} from 'node-fetch'

import { EstatParamsType } from '../types/params'
import { EStatResponseType } from '../types/response'

import paramsSerializer from './paramsSerializer'

const API_KEY = process.env.ESTAT_API_APPID
const BASE_URL = 'https://api.e-stat.go.jp/rest/3.0/app/json/getStatsData'
const PROXY_URL = process.env.HTTP_PROXY
const agent = PROXY_URL ? new HttpsProxyAgent(PROXY_URL) : undefined

const MAX_RETRIES = 3
const INITIAL_RETRY_DELAY = 1000
const MAX_RETRY_DELAY = 10000

function isValidEStatResponse(data: unknown): data is EStatResponseType {
  return data && typeof data === 'object' && 'GET_STATS_DATA' in data
}

async function fetchWithRetry(
  url: string,
  options: NodeFetchRequestInit,
  retries = MAX_RETRIES,
  delay = INITIAL_RETRY_DELAY
): Promise<NodeFetchResponse> {
  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      if (
        response.status === 429 ||
        (response.status >= 500 && response.status < 600)
      ) {
        throw new Error(`Retryable HTTP error! status: ${response.status}`)
      }
      throw new Error(`Non-retryable HTTP error! status: ${response.status}`)
    }
    return response
  } catch (error) {
    if (
      retries > 0 &&
      error instanceof Error &&
      error.message.includes('Retryable')
    ) {
      console.warn(
        `リクエストが失敗しました。${delay / 1000}秒後に再試行します。残り再試行回数: ${retries - 1}`
      )
      await new Promise((resolve) => setTimeout(resolve, delay))
      return fetchWithRetry(
        url,
        options,
        retries - 1,
        Math.min(delay * 2, MAX_RETRY_DELAY)
      )
    } else {
      throw error
    }
  }
}

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
    const response = await fetchWithRetry(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      agent,
    } as NodeFetchRequestInit)

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
