import { Metadata } from 'next'
import dynamic from 'next/dynamic'

import getEnvVariable from 'utils/getEnvVariable'
import handlePrefecture from 'utils/prefecture'
import handleProps from 'utils/props'

// 定数
const PROPS = {
  fieldId: 'energy',
  menuId: 'garbage',
  kindId: 'prefecture',
}

const USE_SSG = getEnvVariable('USE_SSG')

// Dynamic Routesの型定義
interface Params {
  prefCode: string
}

// 動的インポート
const Prefecture = dynamic(() => import('views/energy/garbage/prefecture'), {
  suspense: true,
})

// メタデータの生成
export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const { prefCode } = params
  const { metaProps } = handleProps({ ...PROPS, prefCode })
  return metaProps()
}

// 条件付きSSG
export const generateStaticParams = async () => {
  if (USE_SSG === 'true') {
    const prefectures = handlePrefecture().fetchItems()
    return prefectures.map((p) => ({
      prefCode: p.prefCode,
    }))
  }
  return []
}

// SSGがtrueの場合のみ動的ルートを無効化
export const dynamicParams = USE_SSG !== 'true'

// ページコンポーネント
const Page = ({ params }: { params: Params }) => {
  const { prefCode } = params
  const { routerProps } = handleProps({ ...PROPS, prefCode })

  return <Prefecture routerProps={routerProps} />
}

export default Page
