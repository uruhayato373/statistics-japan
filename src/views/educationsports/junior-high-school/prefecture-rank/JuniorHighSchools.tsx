import RankingJuniorHighSchools from 'sections/educationsports/junior-high-school/prefecture-rank/RankingJuniorHighSchools'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function JuniorHighSchools({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 中学校数 */}
      <PrefectureRankingCards
        Section={RankingJuniorHighSchools}
        routerProps={routerProps}
      />
    </MainView>
  )
}
