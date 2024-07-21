import { NextRequest, NextResponse } from 'next/server'

import handleEstatAPI, { EstatParamsType } from 'utils/e-stat'

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url)
  const statsDataId = searchParams.get('statsDataId')
  const cdCat01 = searchParams.get('cdCat01')

  if (!statsDataId || !cdCat01) {
    return NextResponse.json(
      { message: '必須パラメータが不足しています。' },
      { status: 400 }
    )
  }

  const params: Omit<EstatParamsType, 'appid'> = {
    statsDataId,
    cdCat01,
  }

  // その他のパラメータを追加
  searchParams.forEach((value, key) => {
    if (key !== 'statsDataId' && key !== 'cdCat01') {
      params[key] = value
    }
  })

  try {
    const document = await handleEstatAPI(params).fetchDocument()
    return NextResponse.json(document)
  } catch (error) {
    console.error('e-Stat APIからデータ取得中にエラーが発生しました:', error)

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
