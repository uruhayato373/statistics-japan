/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { HttpsProxyAgent } from 'https-proxy-agent'
import fetch from 'node-fetch'

import paramsSerializer from './modules/paramsSerializer'
import { EstatParamsType } from './types/params'
import { EStatResponseType } from './types/response'

const API_KEY = process.env.ESTAT_API_APPID
const BASE_URL = 'https://api.e-stat.go.jp/rest/3.0/app/json/getStatsData'
const PROXY_URL = process.env.HTTP_PROXY

/**
 * e-Stat APIからデータを取得する関数
 *
 * @param {Omit<EstatParamsType, 'appid'>} params - APIリクエストのパラメータ（appidを除く）
 * @returns {Promise<EStatResponseType>} APIレスポンスのPromise
 * @throws {Error} APIリクエストが失敗した場合にエラーをスロー
 */
export async function fetchEstatAPI(
  params: Omit<EstatParamsType, 'appid'>
): Promise<EStatResponseType> {
  try {
    const { cdCat01, ...otherParams } = params

    const queryParams = {
      appId: API_KEY!,
      ...otherParams,
      ...(Array.isArray(cdCat01)
        ? { cdCat01: cdCat01.join(',') }
        : { cdCat01 }),
    }

    const serializedParams = paramsSerializer(queryParams)

    const fetchOptions: unknown = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }

    if (PROXY_URL) {
      fetchOptions.agent = new HttpsProxyAgent(PROXY_URL)
    }

    const response = await fetch(
      `${BASE_URL}?${serializedParams}`,
      fetchOptions
    )

    if (!response.ok) {
      throw new Error('e-Stat API request failed')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('e-Statデータの取得中にエラーが発生しました:', error)
    throw new Error(
      'e-Statデータの取得に失敗しました。詳細はコンソールを確認してください。'
    )
  }
}
