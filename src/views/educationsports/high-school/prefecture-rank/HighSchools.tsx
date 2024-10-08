import RankingHighSchools from 'sections/educationsports/high-school/prefecture-rank/RankingHighSchools'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function HighSchools({ routerProps }: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 高等学校数 */}
      <PrefectureRankingCards
        Section={RankingHighSchools}
        routerProps={routerProps}
      />
    </MainView>
  )
}
