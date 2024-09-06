import { Suspense } from 'react'

import { Metadata } from 'next'
import dynamic from 'next/dynamic'

import Loader from 'components/Loader'

import handleProps from 'utils/props'

// Japanコンポーネントの動的インポート
const Japan = dynamic(
  () => import('views/infrastructure/urban-planning/japan'),
  {
    loading: () => <Loader />,
  }
)

// 定数
const FIELD_ID = 'infrastructure'
const MENU_ID = 'urban-planning'
const KIND_ID = 'japan'

// 共通のhandleProps呼び出し
const getProps = () =>
  handleProps({
    fieldId: FIELD_ID,
    menuId: MENU_ID,
    kindId: KIND_ID,
  })

/**
 * メタデータを生成
 */
export async function generateMetadata(): Promise<Metadata> {
  const { metaProps } = getProps()
  return metaProps()
}

const Page = () => {
  const { routerProps } = getProps()

  return (
    <Suspense fallback={<Loader />}>
      <Japan routerProps={routerProps} />
    </Suspense>
  )
}

export default Page
