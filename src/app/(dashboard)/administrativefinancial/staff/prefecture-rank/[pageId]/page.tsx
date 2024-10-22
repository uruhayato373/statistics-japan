import { ComponentType } from 'react'

import { Metadata } from 'next'
import dynamic from 'next/dynamic'

import handlePage from 'utils/page'
import handleProps, { RouterProps } from 'utils/props'
import Error404 from 'views/maintenance/404'

// 定数
const PROPS = {
  fieldId: 'administrativefinancial',
  menuId: 'staff',
  kindId: 'prefecture-rank',
}

// コンポーネント名の配列
const COMPONENT_NAMES = ['administrative-department-employees']

// 型定義
type ComponentName = (typeof COMPONENT_NAMES)[number]

interface PageParams {
  pageId: ComponentName
}

interface Props {
  params: PageParams
}

interface ComponentProps {
  routerProps: RouterProps
}

// ユーティリティ関数: ケバブケースをパスカルケースに変換
const toPascalCase = (str: string) =>
  str
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')

// 動的インポートを生成する関数
const createDynamicImport = (
  name: ComponentName
): ComponentType<ComponentProps> =>
  dynamic(
    () =>
      import(
        `views/${PROPS.fieldId}/${PROPS.menuId}/${PROPS.kindId}/${toPascalCase(name)}`
      )
  ) as ComponentType<ComponentProps>

// 動的インポートとコンポーネントマッピング
const COMPONENTS: Record<
  ComponentName,
  ComponentType<ComponentProps>
> = Object.fromEntries(
  COMPONENT_NAMES.map((name) => [name, createDynamicImport(name)])
) as Record<ComponentName, ComponentType<ComponentProps>>

// 静的パラメータ生成
export async function generateStaticParams() {
  const pages = handlePage().items(PROPS.menuId)
  return pages.map((p) => ({ pageId: p.pageId as ComponentName }))
}

// メタデータ生成関数
export async function generateMetadata({
  params,
}: {
  params: PageParams
}): Promise<Metadata> {
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
