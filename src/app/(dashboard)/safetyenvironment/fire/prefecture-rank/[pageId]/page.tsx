import { ComponentType } from 'react'

import { Metadata } from 'next'
import dynamic from 'next/dynamic'

import handlePage from 'utils/page'
import handleProps, { RouterProps } from 'utils/props'
import Error404 from 'views/maintenance/404'

// 定数
const PROPS = {
  fieldId: 'safetyenvironment',
  menuId: 'fire',
  kindId: 'prefecture-rank',
}

// コンポーネント名の配列
const COMPONENT_NAMES = ['number-of-fire-stations'] as const

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
      ),
    { suspense: true }
  )

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

// 共通のprops生成関数
const getProps = (pageId: string) => handleProps({ ...PROPS, pageId })

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

  return <Component routerProps={routerProps} />
}

export default Page
