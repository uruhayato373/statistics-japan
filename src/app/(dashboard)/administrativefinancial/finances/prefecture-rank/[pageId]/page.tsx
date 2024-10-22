import { ComponentType } from 'react'

import { Metadata } from 'next'
import dynamic from 'next/dynamic'

import handlePage from 'utils/page'
import handleProps, { RouterProps } from 'utils/props'
import { toPascalCase } from 'utils/toPascalCase'
import Error404 from 'views/maintenance/404'

// 定数
const PROPS = {
  fieldId: 'administrativefinancial',
  menuId: 'finances',
  kindId: 'prefecture-rank',
}

// ページ一覧の取得
const { items } = handlePage()
const PAGES = items(PROPS.menuId)

interface Props {
  params: {
    pageId: string
  }
}

interface ComponentProps {
  routerProps: RouterProps
}

// 動的インポートを生成する関数
const createDynamicImport = (name: string): ComponentType<ComponentProps> =>
  dynamic(
    () =>
      import(
        `views/${PROPS.fieldId}/finances/prefecture-rank/${toPascalCase(name)}`
      ),
    { suspense: true }
  ) as ComponentType<ComponentProps>

// 動的インポートとコンポーネントマッピング
const COMPONENTS: Record<
  string,
  ComponentType<ComponentProps>
> = Object.fromEntries(
  PAGES.map((p) => p.pageId).map((name) => [name, createDynamicImport(name)])
) as Record<string, ComponentType<ComponentProps>>

// 静的パスを生成
export async function generateStaticParams() {
  return PAGES.map((p) => ({ pageId: p.pageId as string }))
}

// メタデータを生成
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { metaProps } = handleProps({ ...PROPS, pageId: params.pageId })
  return metaProps()
}

// メインページコンポーネント
const Page: React.FC<Props> = ({ params }: Props) => {
  const { routerProps } = handleProps({ ...PROPS, pageId: params.pageId })
  const Component = COMPONENTS[params.pageId]

  if (!Component) {
    return <Error404 />
  }

  return <Component routerProps={routerProps} />
}

export default Page
