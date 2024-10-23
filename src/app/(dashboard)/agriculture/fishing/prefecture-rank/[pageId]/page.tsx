import { PrefectureRankPage } from 'components/app/PrefectureRankPage'

// 定数
const PROPS = {
  fieldId: 'agriculture',
  menuId: 'fishing',
  kindId: 'prefecture-rank',
}

// ページコンポーネント（共通）
const { PageComponent, generateStaticParams, generateMetadata } =
  PrefectureRankPage(PROPS)

export { generateStaticParams, generateMetadata }
export default PageComponent
