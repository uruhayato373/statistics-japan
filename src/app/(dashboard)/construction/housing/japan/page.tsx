import { JapanPage } from 'components/app/JapanPage'

// 定数
const PROPS = {
  fieldId: 'construction',
  menuId: 'housing',
  kindId: 'japan',
}

// ページコンポーネント（共通）
const { PageComponent, generateMetadata } = JapanPage(PROPS)

export { generateMetadata }
export default PageComponent
