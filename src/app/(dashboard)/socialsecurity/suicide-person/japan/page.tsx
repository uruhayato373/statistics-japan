import { JapanPage } from 'components/app/JapanPage'

// 定数
const PROPS = {
  fieldId: 'socialsecurity',
  menuId: 'suicide-person',
  kindId: 'japan',
}

// ページコンポーネント（共通）
const { PageComponent, generateMetadata } = JapanPage(PROPS)

export { generateMetadata }
export default PageComponent
