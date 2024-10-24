import { JapanPage } from 'components/app/JapanPage'
// import dynamic from 'next/dynamic'

// 定数
const PROPS = {
  fieldId: 'landweather',
  menuId: 'weather',
  kindId: 'japan',
}

// ページコンポーネント（共通）
const { PageComponent, generateMetadata } = JapanPage(PROPS)

export { generateMetadata }
export default PageComponent
