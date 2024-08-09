/* eslint-disable react/prop-types */
import { ComponentType, Suspense } from 'react'

import { Metadata } from 'next'
import dynamic from 'next/dynamic'

import Loader from 'components/Loader'

import handleProps from 'utils/props'
import Error404 from 'views/maintenance/404'

const Japan = dynamic(() => import('views/landweather/total-area/japan'))
const PrefRankTotalArea = dynamic(
  () => import('views/landweather/total-area/prefRankTotalArea')
)
const PrefRankHabitableArea = dynamic(
  () => import('views/landweather/total-area/prefRankHabitableArea')
)
const PrefRankHabitableAreaRatio = dynamic(
  () => import('views/landweather/total-area/prefRankHabitableAreaRatio')
)
const Prefecture = dynamic(
  () => import('views/landweather/total-area/prefecture')
)
const City = dynamic(() => import('views/landweather/total-area/city'))

/**
 * fieldIdとmenuIdを指定
 */
const fieldId = 'landweather'
const menuId = 'total-area'

/**
 * metaDataを生成
 */
export async function generateMetadata({ params }): Promise<Metadata> {
  const [kindId, prefCodeOrPageId, cityCode] = params.slug

  const {
    prefCode = kindId === 'prefecture-rank' ? null : prefCodeOrPageId,
    pageId = kindId === 'prefecture-rank' ? prefCodeOrPageId : null,
  } = {}
  const { metaProps } = handleProps({
    fieldId,
    menuId,
    kindId,
    pageId,
    prefCode,
    cityCode,
  })
  return metaProps()
}

/**
 * ページコンポーネント
 *
 * @description
 * URLのスラッグに基づいて、viewsコンポーネントのいずれかを動的にロードして表示する。
 * - 日本の統計
 * - 都道府県ランキング
 * - 都道府県の統計
 * - 市区町村の統計
 * 該当するルートがない場合は404エラーページを表示する。
 *
 */
const Page = ({ params }) => {
  const [kindId, prefCodeOrPageId, cityCode] = params.slug

  const {
    prefCode = kindId === 'prefecture-rank' ? null : prefCodeOrPageId,
    pageId = kindId === 'prefecture-rank' ? prefCodeOrPageId : null,
  } = {}
  const { routerProps } = handleProps({
    fieldId,
    menuId,
    kindId,
    pageId,
    prefCode,
    cityCode,
  })

  let Component: ComponentType<object>
  let props = {}

  switch (kindId) {
    case 'japan':
      Component = Japan
      props = { routerProps }
      break
    case 'prefecture-rank':
      switch (pageId) {
        case 'total-area':
          Component = PrefRankTotalArea
          props = { routerProps }
          break
        case 'habitable-area':
          Component = PrefRankHabitableArea
          props = { routerProps }
          break
        case 'habitable-area-ratio':
          Component = PrefRankHabitableAreaRatio
          props = { routerProps }
          break
        default:
          Component = PrefRankTotalArea
          props = { routerProps }
      }
      break
    case 'prefecture':
      Component = Prefecture
      props = { routerProps }
      break
    case 'city':
      Component = City
      props = { routerProps }
      break
    default:
      return <Error404 />
  }

  return (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  )
}

export default Page
