import { NextRequest, NextResponse } from 'next/server'

import handleEstatAPI, { EstatParamsType } from 'utils/e-stat'

/**
 * e-Stat APIからデータを取得するGETリクエストハンドラ
 * @param {NextRequest} request - 受信したリクエスト
 * @returns {Promise<NextResponse>} JSONレスポンス
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  // URLからクエリパラメータを取得
  const { searchParams } = new URL(request.url)
  const statsDataId = searchParams.get('statsDataId')
  const cdCat01 = searchParams.get('cdCat01')

  // 必須パラメータのチェック
  if (!statsDataId || !cdCat01) {
    return NextResponse.json(
      { message: '必須パラメータが不足しています。' },
      { status: 400 }
    )
  }

  // APIリクエスト用のパラメータオブジェクトを作成
  const params: Omit<EstatParamsType, 'appid'> = {
    statsDataId,
    cdCat01,
  }

  // その他のオプションパラメータを追加
  searchParams.forEach((value, key) => {
    if (key !== 'statsDataId' && key !== 'cdCat01') {
      params[key] = value
    }
  })

  try {
    // e-Stat APIからデータを取得
    const document = await handleEstatAPI(params).fetchDocument()
    return NextResponse.json(document)
  } catch (error) {
    console.error('e-Stat APIからデータ取得中にエラーが発生しました:', error)

    // エラーハンドリング
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 })
    } else {
      return NextResponse.json(
        { message: '予期しないエラーが発生しました。' },
        { status: 500 }
      )
    }
  }
}
