import { Suspense } from 'react'

import { Metadata } from 'next'

import Loader from 'components/Loader'

import handleProps from 'utils/props'
import Prefecture from 'views/landweather/total-area/prefecture'

// 定数
const FIELD_ID = 'landweather'
const MENU_ID = 'total-area'
const KIND_ID = 'prefecture'

// 型定義
interface Params {
  prefCode: string
}

// 共通のhandleProps呼び出し
const getProps = (prefCode: string) =>
  handleProps({
    fieldId: FIELD_ID,
    menuId: MENU_ID,
    kindId: KIND_ID,
    prefCode,
  })

/**
 * メタデータを生成
 */
export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const { prefCode } = params
  const { metaProps } = getProps(prefCode)
  return metaProps()
}

const Page = ({ params }: { params: Params }) => {
  const { prefCode } = params
  const { routerProps } = getProps(prefCode)

  return (
    <Suspense fallback={<Loader />}>
      <Prefecture routerProps={routerProps} />
    </Suspense>
  )
}

export default Page
