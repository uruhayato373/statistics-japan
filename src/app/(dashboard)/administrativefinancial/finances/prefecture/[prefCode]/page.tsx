import { Metadata } from 'next'
import dynamic from 'next/dynamic'

import { handlePrefecture } from 'utils/prefecture'
import handleProps from 'utils/props'

// SSGとしてレンダリング
export const generateStaticParams = async () => {
  const prefectures = handlePrefecture().fetchItems()

  return prefectures.map((p) => ({
    prefCode: p.prefCode,
  }))
}

export const dynamicParams = false

// 定数
const FIELD_ID = 'administrativefinancial'
const MENU_ID = 'finances'
const KIND_ID = 'prefecture'

// Dynamic Routesの型定義
interface Params {
  prefCode: string
}

// 動的インポート
const Prefecture = dynamic(
  () => import('views/administrativefinancial/finances/prefecture'),
  {
    loading: () => <div>Loading...</div>,
    ssr: false,
  }
)

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

  return <Prefecture routerProps={routerProps} />
}

export default Page
