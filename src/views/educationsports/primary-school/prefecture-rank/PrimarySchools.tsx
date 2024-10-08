import RankingPrimarySchools from 'sections/educationsports/primary-school/prefecture-rank/RankingPrimarySchools'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function PrimarySchools({ routerProps }: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 小学校数 */}
      <PrefectureRankingCards
        Section={RankingPrimarySchools}
        routerProps={routerProps}
      />
    </MainView>
  )
}
