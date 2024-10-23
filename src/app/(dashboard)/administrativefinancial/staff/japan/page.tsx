import { JapanPage } from 'components/app/JapanPage'

// 定数
const PROPS = {
  fieldId: 'administrativefinancial',
  menuId: 'staff',
  kindId: 'japan',
}

// ページコンポーネント（共通）
const { PageComponent, generateMetadata } = JapanPage(PROPS)

export { generateMetadata }
export default PageComponent
