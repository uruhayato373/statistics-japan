import { Suspense } from 'react'

import { Metadata } from 'next'
// import dynamic from 'next/dynamic'

import Loader from 'components/Loader'

import handleProps from 'utils/props'

// 定数
const FIELD_ID = 'landweather'
const MENU_ID = 'weather'
const KIND_ID = 'japan'

// 動的インポート
// const Japan = dynamic(() => import('views/landweather/weather/japan'))

// 共通のhandleProps呼び出し
const getProps = () =>
  handleProps({
    fieldId: FIELD_ID,
    menuId: MENU_ID,
    kindId: KIND_ID,
  })

// メタデータ生成関数
export async function generateMetadata(): Promise<Metadata> {
  const { metaProps } = getProps()
  return metaProps()
}

const Page = () => {
  return <Suspense fallback={<Loader />}>{/* <Japan /> */}</Suspense>
}

export default Page
