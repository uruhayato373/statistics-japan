import { Suspense } from 'react'

import { Metadata } from 'next'

import Loader from 'components/Loader'

import { handlePrefecture } from 'utils/prefecture'
import handleProps from 'utils/props'
import Prefecture from 'views/safetyenvironment/disaster-pollution/prefecture'

// SSGとしてレンダリング
export const dynamic = 'force-static'

// 定数
const FIELD_ID = 'safetyenvironment'
const MENU_ID = 'disaster-pollution'
const KIND_ID = 'prefecture'

// Dynamic Routesの型定義
interface Params {
  prefCode: string
}

// 静的に生成するパスを指定
export async function generateStaticParams() {
  const prefectures = handlePrefecture().fetchItems()

  return prefectures.map((p) => ({
    prefCode: p.prefCode,
  }))
}

// 共通のhandlePropsを取得
const getProps = (prefCode: string) =>
  handleProps({
    fieldId: FIELD_ID,
    menuId: MENU_ID,
    kindId: KIND_ID,
    prefCode,
  })

// メタ情報を生成
export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const { prefCode } = params
  const { metaProps } = getProps(prefCode)
  return metaProps()
}

// ページコンポーネント
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
