/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { HttpsProxyAgent } from 'https-proxy-agent'
import fetch from 'node-fetch'

const RESAS_API_KEY = process.env.RESAS_API_KEY
const BASE_URL = 'https://opendata.resas-portal.go.jp'
const PROXY_URL = process.env.HTTP_PROXY

export interface ResasParamsType {
  url: string
  [key: string]: string | number | boolean // 追加のパラメータを許可
}

export interface ResasResponseType<T> {
  message: string | null
  result: T
}

export const fetchResasAPI = async <T>(
  resasParams: ResasParamsType
): Promise<ResasResponseType<T>> => {
  if (!RESAS_API_KEY) {
    throw new Error('環境変数に RESAS_API_KEY が設定されていません。')
  }

  try {
    const { url, ...params } = resasParams
    const paramString = new URLSearchParams(
      params as Record<string, string>
    ).toString()

    const fetchOptions: RequestInit = {
      method: 'GET',
      headers: {
        'X-API-KEY': RESAS_API_KEY,
      },
      cache: 'force-cache',
    }

    if (PROXY_URL) {
      fetchOptions.agent = new HttpsProxyAgent(PROXY_URL)
    }

    const response = await fetch(
      `${BASE_URL}/${url}?${paramString}`,
      fetchOptions
    )

    if (!response.ok) {
      throw new Error(
        `RESAS-APIへのリクエストが失敗しました: ${response.statusText}`
      )
    }

    const responseText = await response.text()
    const data = JSON.parse(responseText) as ResasResponseType<T>
    return data
  } catch (error) {
    console.error('RESAS-API データの取得中にエラーが発生しました:', error)
    throw error
  }
}
