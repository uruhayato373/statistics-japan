import { ComponentType, Suspense } from 'react'

import { Metadata } from 'next'
import dynamic from 'next/dynamic'

import Loader from 'components/Loader'

import { handlePage } from 'utils/page'
import handleProps, { RouterProps } from 'utils/props'
import Error404 from 'views/maintenance/404'

// 定数
const FIELD_ID = 'agriculture'
const MENU_ID = 'fishing'
const KIND_ID = 'prefecture-rank'

// 動的インポートとコンポーネントマッピング
const COMPONENTS: Record<string, ComponentType<ComponentProps>> = {
  'fishery-output-value': dynamic(
    () => import('views/agriculture/fishing/prefecture-rank/FisheryOutputValue')
  ),
  'aquaculture-yield': dynamic(
    () => import('views/agriculture/fishing/prefecture-rank/AquacultureYield')
  ),
  'catch-amount': dynamic(
    () => import('views/agriculture/fishing/prefecture-rank/CatchAmount')
  ),
  'number-of-fishermen-employed': dynamic(
    () =>
      import(
        'views/agriculture/fishing/prefecture-rank/NumberOfFishermenEmployed'
      )
  ),
}

export async function generateStaticParams() {
  const pages = handlePage().items(MENU_ID)

  return pages.map((p) => ({
    pageId: p.pageId,
  }))
}

// 型定義
interface PageParams {
  pageId: string
}

interface Props {
  params: PageParams
}

interface ComponentProps {
  routerProps: RouterProps
}

// 共通のprops生成関数
const getProps = (pageId: string) =>
  handleProps({
    fieldId: FIELD_ID,
    menuId: MENU_ID,
    kindId: KIND_ID,
    pageId,
  })

// メタデータ生成関数
export async function generateMetadata({
  params,
}: {
  params: PageParams
}): Promise<Metadata> {
  const { metaProps } = getProps(params.pageId)
  return metaProps()
}

// メインページコンポーネント
const Page: React.FC<Props> = ({ params }: Props) => {
  const { routerProps } = getProps(params.pageId)
  const Component = COMPONENTS[params.pageId]

  if (!Component) {
    return <Error404 />
  }

  return (
    <Suspense fallback={<Loader />}>
      <Component routerProps={routerProps} />
    </Suspense>
  )
}

export default Page
