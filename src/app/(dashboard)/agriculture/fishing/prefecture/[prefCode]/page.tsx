import { PrefecturePage } from 'components/app/PrefecturePage'

// 定数
const PROPS = {
  fieldId: 'agriculture',
  menuId: 'fishing',
  kindId: 'prefecture',
}

// ページコンポーネント（共通）
const { PageComponent, generateStaticParams, generateMetadata } =
  PrefecturePage(PROPS)

export { generateStaticParams, generateMetadata }
export default PageComponent
