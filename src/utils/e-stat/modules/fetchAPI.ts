import { HttpsProxyAgent } from 'https-proxy-agent'
import fetch from 'node-fetch'

import { EstatParamsType } from '../types/params'
import { EStatResponseType } from '../types/response'

import paramsSerializer from './paramsSerializer'

/**
 * e-Stat API の認証キー
 * 環境変数 ESTAT_API_APPID から取得します。
 * このキーは API リクエストの認証に必要です。
 */
const API_KEY = process.env.ESTAT_API_APPID

/**
 * e-Stat API のベース URL
 * このURLに対してクエリパラメータを追加してAPIリクエストを行います。
 */
const BASE_URL = 'https://api.e-stat.go.jp/rest/3.0/app/json/getStatsData'

/**
 * HTTPプロキシのURL
 * 環境変数 HTTP_PROXY から取得します。
 * プロキシサーバーを経由してAPIリクестを行う場合に使用します。
 */
const PROXY_URL = process.env.HTTP_PROXY

/**
 * HTTPSプロキシエージェント
 * PROXY_URL が設定されている場合、HttpsProxyAgent のインスタンスを作成します。
 * プロキシサーバーを使用する場合、このエージェントを fetch 関数に渡します。
 */
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