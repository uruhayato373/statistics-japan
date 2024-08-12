import { ComponentType, Suspense } from 'react'

import { Metadata } from 'next'
import dynamic from 'next/dynamic'

import Loader from 'components/Loader'

import handleProps, { RouterProps } from 'utils/props'
import Error404 from 'views/maintenance/404'

// 定数
const FIELD_ID = 'laborwage'
const MENU_ID = 'laborforce'
const KIND_ID = 'prefecture-rank'

// 型定義
interface PageParams {
  pageId: string
}

interface Props {
  params: PageParams
  searchParams: Record<string, string | string[] | undefined>
}

interface ComponentProps {
  routerProps: RouterProps
  searchParams: Props['searchParams']
}

// 動的インポートとコンポーネントマッピング
const COMPONENTS: Record<string, ComponentType<ComponentProps>> = {
  'laborforce-population': dynamic(
    () => import('views/laborwage/laborforce/prefecture-rank/Laborforce')
  ),
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
const Page: React.FC<Props> = ({ params, searchParams }: Props) => {
  const { routerProps } = getProps(params.pageId)
  const Component = COMPONENTS[params.pageId]

  if (!Component) {
    return <Error404 />
  }

  return (
    <Suspense fallback={<Loader />}>
      <Component routerProps={routerProps} searchParams={searchParams} />
    </Suspense>
  )
}

export default Page
