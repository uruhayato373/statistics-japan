import { ComponentType, Suspense } from 'react'

import { Metadata } from 'next'
import dynamic from 'next/dynamic'

import Loader from 'components/Loader'

import { handlePage } from 'utils/page'
import handleProps, { RouterProps } from 'utils/props'
import Error404 from 'views/maintenance/404'

// 定数
const FIELD_ID = 'administrativefinancial'
const MENU_ID = 'finances'
const KIND_ID = 'prefecture-rank'

// 動的インポートとコンポーネントマッピング
const COMPONENTS: Record<string, ComponentType<ComponentProps>> = {
  'financial-strength-index': dynamic(
    () =>
      import(
        'views/administrativefinancial/finances/prefecture-rank/FinancialStrengthIndex'
      )
  ),
  'total-revenue-settlement': dynamic(
    () =>
      import(
        'views/administrativefinancial/finances/prefecture-rank/TotalRevenueSettlement'
      )
  ),
  'total-expenditures': dynamic(
    () =>
      import(
        'views/administrativefinancial/finances/prefecture-rank/TotalExpenditures'
      )
  ),
  'future-burden-ratio': dynamic(
    () =>
      import(
        'views/administrativefinancial/finances/prefecture-rank/FutureBurdenRatio'
      )
  ),
  'real-debt-service-ratio': dynamic(
    () =>
      import(
        'views/administrativefinancial/finances/prefecture-rank/RealDebtServiceRatio'
      )
  ),
  'current-account-ratio': dynamic(
    () =>
      import(
        'views/administrativefinancial/finances/prefecture-rank/CurrentAccountRatio'
      )
  ),
  'current-amount-of-local-bonds': dynamic(
    () =>
      import(
        'views/administrativefinancial/finances/prefecture-rank/CurrentAmountOfLocalBonds'
      )
  ),
  'real-balance-ratio': dynamic(
    () =>
      import(
        'views/administrativefinancial/finances/prefecture-rank/RealBalanceRatio'
      )
  ),
  'standard-financial-income-amount': dynamic(
    () =>
      import(
        'views/administrativefinancial/finances/prefecture-rank/StandardFinancialIncomeAmount'
      )
  ),
  'standard-financial-demand-amount': dynamic(
    () =>
      import(
        'views/administrativefinancial/finances/prefecture-rank/StandardFinancialDemandAmount'
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
