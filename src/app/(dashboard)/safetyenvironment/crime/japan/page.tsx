import { JapanPage } from 'components/app/JapanPage'

// 定数
const PROPS = {
  fieldId: 'safetyenvironment',
  menuId: 'crime',
  kindId: 'japan',
}

// ページコンポーネント（共通）
const { PageComponent, generateMetadata } = JapanPage(PROPS)

export { generateMetadata }
export default PageComponent
