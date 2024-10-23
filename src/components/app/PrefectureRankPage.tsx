import { ComponentType } from 'react'

import { Metadata } from 'next'
import dynamic from 'next/dynamic'

import { AppsPropsType } from 'types/apps'
import { ViewsPropsType } from 'types/views'
import handlePage from 'utils/page'
import handleProps, { RouterProps } from 'utils/props'
import { toPascalCase } from 'utils/toPascalCase'
import Error404 from 'views/maintenance/404'

const createDynamicImport = (
  { fieldId, menuId, kindId }: RouterProps,
  name: string
): ComponentType<ViewsPropsType> =>
  dynamic(
    () => import(`views/${fieldId}/${menuId}/${kindId}/${toPascalCase(name)}`),
    { suspense: true }
  ) as ComponentType<ViewsPropsType>

export const PrefectureRankPage = (props: RouterProps) => {
  // ページ一覧の取得
  const { items } = handlePage()
  const PAGES = items(props.menuId)

  // 動的インポートとコンポーネントマッピング
  const COMPONENTS: Record<
    string,
    ComponentType<ViewsPropsType>
  > = Object.fromEntries(
    PAGES.map((p) => p.pageId).map((d) => [d, createDynamicImport(props, d)])
  ) as Record<string, ComponentType<ViewsPropsType>>

  // 静的パスを生成する関数
  const generateStaticParams = async () => {
    return PAGES.map((p) => ({ pageId: p.pageId as string }))
  }

  // メタデータを生成する関数
  const generateMetadata = async ({
    params,
  }: AppsPropsType): Promise<Metadata> => {
    const { metaProps } = handleProps({ ...props, pageId: params.pageId })
    return metaProps()
  }

  // ページコンポーネント
  const PageComponent: React.FC<AppsPropsType> = ({
    params,
  }: AppsPropsType) => {
    const { routerProps } = handleProps({ ...props, pageId: params.pageId })
    const Component = COMPONENTS[params.pageId]

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
