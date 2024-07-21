import { NextRequest, NextResponse } from 'next/server'

import { CityType, handleCity } from 'utils/city'

/**
 * API レスポンスのデータ型
 */
type ResponseDataType = CityType | CityType[]

/**
 * 市区町村データを取得するためのAPI Routes
 *
 * @param {NextRequest} request - 受信したリクエストオブジェクト
 * @returns {Promise<NextResponse>} JSON レスポンスを含む Promise
 *
 * @throws {Error} データ取得中にエラーが発生した場合
 *
 * @example
 * // 全市区町村データを取得
 * GET /api/prefectures
 *
 * // 特定の市区町村データを取得
 * GET /api/prefectures?prefCode=28000
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { fetchItems, findItem } = handleCity()

    const url = new URL(request.url)
    const prefCode = url.searchParams.get('prefCode')
    const cityCode = url.searchParams.get('cityCode')

    let fetchFunction: () => Promise<ResponseDataType>

    if (cityCode) {
      fetchFunction = () => findItem(cityCode)
    } else {
      if (prefCode) {
        fetchFunction = () => fetchItems(prefCode)
      } else {
        fetchFunction = fetchItems
      }
    }

    const data = await fetchFunction()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error processing request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
