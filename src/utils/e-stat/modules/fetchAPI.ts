import { HttpsProxyAgent } from 'https-proxy-agent'
import nodeFetch, {
  Response as NodeFetchResponse,
  RequestInit as NodeFetchRequestInit,
} from 'node-fetch'

import { EstatParamsType } from '../types/params'
import { EStatResponseType } from '../types/response'

import paramsSerializer from './paramsSerializer'

const API_KEY = process.env.ESTAT_API_APPID
const BASE_URL = 'https://api.e-stat.go.jp/rest/3.0/app/json/getStatsData'
const PROXY_URL = process.env.HTTP_PROXY
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'

const MAX_RETRIES = 3
const INITIAL_RETRY_DELAY = 1000
const MAX_RETRY_DELAY = 10000

function isValidEStatResponse(data: unknown): data is EStatResponseType {
  return data && typeof data === 'object' && 'GET_STATS_DATA' in data
}

type CustomResponse = NodeFetchResponse | Response
type CustomRequestInit = NodeFetchRequestInit & RequestInit

type FetchFunction = (
  url: string,
  init?: CustomRequestInit
) => Promise<CustomResponse>

const createFetchWithAgent = (
  agent: HttpsProxyAgent<string>
): FetchFunction => {
  return (url: string, init?: CustomRequestInit) =>
    nodeFetch(url, { ...init, agent } as NodeFetchRequestInit)
}

const getFetchFunction = (): FetchFunction => {
  if (IS_DEVELOPMENT) {
    console.log('Development環境: node-fetchを使用します')
    return PROXY_URL
      ? createFetchWithAgent(new HttpsProxyAgent<string>(PROXY_URL))
      : nodeFetch
  } else {
    console.log('Production環境: グローバルfetchを使用します')
    return fetch as unknown as FetchFunction
  }
}

const customFetch = getFetchFunction()

async function fetchWithRetry(
  url: string,
  options: CustomRequestInit,
  retries = MAX_RETRIES,
  delay = INITIAL_RETRY_DELAY
): Promise<CustomResponse> {
  try {
    const response = await customFetch(url, options)
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeParams(params: Record<string, any>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => [
      key,
      Array.isArray(value) ? value.join(',') : value,
    ])
  )
}

export async function fetchEstatAPI(
  params: Omit<EstatParamsType, 'appId'>,
  revalidate?: number
): Promise<EStatResponseType> {
  const normalizedParams = normalizeParams(params)
  const queryParams: EstatParamsType = {
    appId: API_KEY!,
    ...normalizedParams,
  } as EstatParamsType

  const url = `${BASE_URL}?${paramsSerializer(queryParams)}`

  try {
    const options: CustomRequestInit = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }

    if (!IS_DEVELOPMENT && revalidate !== undefined) {
      ;(options as RequestInit).next = { revalidate }
    }

    const response = await fetchWithRetry(url, options)

    const data = await response.json()

    if (!isValidEStatResponse(data)) {
      throw new Error('e-Stat APIからの応答形式が無効です')
    }

    // jsonファイルに保存
    // await actionSaveEstatResponse(paramsSerializer(normalizedParams), data)

    return data
  } catch (error) {
    throw new Error(
      'e-Statデータの取得に失敗しました。詳細はコンソールを確認してください。'
    )
  }
}
