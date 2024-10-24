import { PrefecturePage } from 'components/app/PrefecturePage'

// 定数
const PROPS = {
  fieldId: 'tourism',
  menuId: 'inns',
  kindId: 'prefecture',
}

// ページコンポーネント（共通）
const { PageComponent, generateStaticParams, generateMetadata } =
  PrefecturePage(PROPS)

export { generateStaticParams, generateMetadata }
export default PageComponent
