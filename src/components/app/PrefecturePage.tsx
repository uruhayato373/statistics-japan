import { ComponentType } from 'react'

import { Metadata } from 'next'
import dynamic from 'next/dynamic'

import Error404 from 'views/maintenance/404'

import getEnvVariable from 'utils/getEnvVariable'
import handlePrefecture from 'utils/prefecture'
import handleProps from 'utils/props'

import { AppsPropsType, RouterPropsType } from 'types/apps'
import { ViewsPropsType } from 'types/views'

const createDynamicImport = ({
  fieldId,
  menuId,
  kindId,
}: RouterPropsType): ComponentType<ViewsPropsType> =>
  dynamic(() => import(`views/${fieldId}/${menuId}/${kindId}`), {
    suspense: true,
  }) as ComponentType<ViewsPropsType>

export const PrefecturePage = (props: RouterPropsType) => {
  const USE_SSG = getEnvVariable('USE_SSG')

  // 条件付きSSG
  const generateStaticParams = async () => {
    if (USE_SSG === 'true') {
      const prefectures = await handlePrefecture().fetchItems()
      return prefectures.map((p) => ({
        prefCode: p.prefCode,
      }))
    }
    return []
  }

  // メタデータを生成する関数
  const generateMetadata = async ({
    params,
  }: AppsPropsType): Promise<Metadata> => {
    const { prefCode } = params
    const { metaProps } = handleProps({ ...props, prefCode })
    return metaProps()
  }

  // ページコンポーネント
  const PageComponent: React.FC<AppsPropsType> = ({
    params,
  }: AppsPropsType) => {
    const { prefCode } = params
    const { routerProps } = handleProps({ ...props, prefCode })
    const Component = createDynamicImport({ ...routerProps })

    if (!Component) {
      return <Error404 />
    }

    return <Component routerProps={routerProps} />
  }

  return {
    PageComponent,
    generateStaticParams,
    generateMetadata,
  }
}