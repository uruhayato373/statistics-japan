import { NextRequest, NextResponse } from 'next/server'

import {
  handlePrefecture,
  PrefectureType,
  RegionPrefectureType,
} from 'utils/prefecture'

/**
 * API レスポンスのデータ型
 */
type ResponseDataType =
  | PrefectureType
  | PrefectureType[]
  | RegionPrefectureType[]

/**
 * 都道府県データを取得するためのAPI Routes
 *
 * @param {NextRequest} request - 受信したリクエストオブジェクト
 * @returns {Promise<NextResponse>} JSON レスポンスを含む Promise
 *
 * @throws {Error} データ取得中にエラーが発生した場合
 *
 * @example
 * // 全都道府県データを取得
 * GET /api/prefectures
 *
 * // 特定の都道府県データを取得
 * GET /api/prefectures?prefCode=28000
 *
 * // 地域別都道府県データを取得
 * GET /api/prefectures?type=regions
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { fetchItems, findItem, fetchRegions } = handlePrefecture()

    const url = new URL(request.url)
    const prefCode = url.searchParams.get('prefCode')
    const type = url.searchParams.get('type')

    let fetchFunction: () => Promise<ResponseDataType>

    if (prefCode) {
      fetchFunction = () => findItem(prefCode)
    } else if (type === 'regions') {
      fetchFunction = fetchRegions
    } else {
      fetchFunction = fetchItems
    }

    const data = await fetchFunction()
    return NextResponse.json(data)
  } catch (error) {
    console.error('リクエスト処理中にエラーが発生しました:', error)
    return NextResponse.json(
      { error: 'サーバー内部エラーが発生しました' },
      { status: 500 }
    )
  }
}
