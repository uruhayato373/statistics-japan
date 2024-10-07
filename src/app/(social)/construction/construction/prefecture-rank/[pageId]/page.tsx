import { ComponentType, Suspense } from 'react'

import { Metadata } from 'next'
import dynamic from 'next/dynamic'

import Loader from 'components/Loader'

import { handlePage } from 'utils/page'
import handleProps, { RouterProps } from 'utils/props'
import Error404 from 'views/maintenance/404'

// 定数
const FIELD_ID = 'construction'
const MENU_ID = 'construction'
const KIND_ID = 'prefecture-rank'

// 動的インポートとコンポーネントマッピング
const COMPONENTS: Record<string, ComponentType<ComponentProps>> = {
  'construction-companies': dynamic(
    () =>
      import(
        'views/construction/construction/prefecture-rank/ConstructionCompanies'
      )
  ),
  'value-of-completed-construction-work-by-prime-contractors': dynamic(
    () =>
      import(
        'views/construction/construction/prefecture-rank/ValueOfCompletedConstructionWorkByPrimeContractors'
      )
  ),
  'value-of-completed-construction-work-by-subcontractors': dynamic(
    () =>
      import(
        'views/construction/construction/prefecture-rank/ValueOfCompletedConstructionWorkBySubcontractors'
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
