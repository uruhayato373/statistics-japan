import { ComponentType, Suspense } from 'react'

import { Metadata } from 'next'
import dynamic from 'next/dynamic'

import Loader from 'components/Loader'

import handleProps from 'utils/props'
import Error404 from 'views/maintenance/404'

// コンポーネントの動的インポート
const PrefRankTotalArea = dynamic(
  () => import('views/landweather/total-area/prefRankTotalArea')
)
const PrefRankHabitableArea = dynamic(
  () => import('views/landweather/total-area/prefRankHabitableArea')
)

// 定数
const FIELD_ID = 'landweather'
const MENU_ID = 'total-area'
const KIND_ID = 'prefecture-rank'

// 型定義
interface Props {
  params: { pageId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

interface ComponentProps {
  routerProps: ReturnType<typeof handleProps>['routerProps']
  searchParams: Props['searchParams']
}

// コンポーネントマッピング
const COMPONENTS: { [key: string]: ComponentType<ComponentProps> } = {
  'total-area': PrefRankTotalArea,
  'habitable-area': PrefRankHabitableArea,
}

// メタデータ生成関数
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pageId } = params
  const { metaProps } = handleProps({
    fieldId: FIELD_ID,
    menuId: MENU_ID,
    kindId: KIND_ID,
    pageId,
    prefCode: null,
    cityCode: null,
  })
  return metaProps()
}

// メインページコンポーネント
const Page = ({ params, searchParams }: Props) => {
  const { pageId } = params

  const { routerProps } = handleProps({
    fieldId: FIELD_ID,
    menuId: MENU_ID,
    kindId: KIND_ID,
    pageId,
    prefCode: null,
    cityCode: null,
  })

  const Component = COMPONENTS[pageId]

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
