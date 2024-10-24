import { PrefecturePage } from 'components/app/PrefecturePage'

// 定数
const PROPS = {
  fieldId: 'commercial',
  menuId: 'product-sales',
  kindId: 'prefecture',
}

// ページコンポーネント（共通）
const { PageComponent, generateStaticParams, generateMetadata } =
  PrefecturePage(PROPS)

export { generateStaticParams, generateMetadata }
export default PageComponent
