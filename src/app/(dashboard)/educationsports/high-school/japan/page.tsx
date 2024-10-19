import { Metadata } from 'next'
import dynamic from 'next/dynamic'

import handleProps from 'utils/props'

// 定数
const FIELD_ID = 'educationsports'
const MENU_ID = 'high-school'
const KIND_ID = 'japan'

// 動的インポート
const Japan = dynamic(() => import('views/educationsports/high-school/japan'), {
  suspense: true,
})

// 共通のhandleProps呼び出し
const getProps = () =>
  handleProps({
    fieldId: FIELD_ID,
    menuId: MENU_ID,
    kindId: KIND_ID,
  })

export const generateMetadata = async (): Promise<Metadata> => {
  const { metaProps } = getProps()
  return metaProps()
}

const Page = () => {
  const { routerProps } = getProps()

  return <Japan routerProps={routerProps} />
}

export default Page
