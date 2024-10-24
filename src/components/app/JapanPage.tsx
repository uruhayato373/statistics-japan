import { ComponentType } from 'react'

import { Metadata } from 'next'
import dynamic from 'next/dynamic'

import { ViewsPropsType } from 'types/views'
import handleProps from 'utils/props'

const createDynamicImport = ({
  fieldId,
  menuId,
  kindId,
}: RouterPropsType): ComponentType<ViewsPropsType> =>
  dynamic(() => import(`views/${fieldId}/${menuId}/${kindId}`), {
    suspense: true,
  }) as ComponentType<ViewsPropsType>

export const JapanPage = (props: RouterPropsType) => {
  // 動的インポート
  const DynamicComponent: ComponentType<ViewsPropsType> =
    createDynamicImport(props)

  // 共通のhandleProps呼び出し
  const getProps = () => handleProps(props)

  // メタデータ生成
  const generateMetadata = async (): Promise<Metadata> => {
    const { metaProps } = getProps()
    return metaProps()
  }

  // ページコンポーネント
  const PageComponent = () => {
    const { routerProps } = getProps()
    return <DynamicComponent routerProps={routerProps} />
  }

  return {
    PageComponent,
    generateMetadata,
  }
}
