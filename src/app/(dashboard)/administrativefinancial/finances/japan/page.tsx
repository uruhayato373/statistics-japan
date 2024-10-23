import { JapanPage } from 'components/app/JapanPage'

// 定数
const PROPS = {
  fieldId: 'administrativefinancial',
  menuId: 'finances',
  kindId: 'japan',
}

const { PageComponent, generateMetadata } = JapanPage(PROPS)

export { generateMetadata }
export default PageComponent
