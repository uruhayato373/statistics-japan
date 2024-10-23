import { JapanPage } from 'components/app/JapanPage'

// 定数
const PROPS = {
  fieldId: 'population',
  menuId: 'population',
  kindId: 'japan',
}

// ページコンポーネント（共通）
const { PageComponent, generateMetadata } = JapanPage(PROPS)

export { generateMetadata }
export default PageComponent
