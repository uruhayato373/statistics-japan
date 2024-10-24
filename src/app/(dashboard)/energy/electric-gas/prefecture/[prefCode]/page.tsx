import { PrefecturePage } from 'components/app/PrefecturePage'

// Constants
const PROPS = {
  fieldId: 'energy',
  menuId: 'electric-gas',
  kindId: 'prefecture',
}

// ページコンポーネント（共通）
const { PageComponent, generateStaticParams, generateMetadata } =
  PrefecturePage(PROPS)

export { generateStaticParams, generateMetadata }
export default PageComponent
