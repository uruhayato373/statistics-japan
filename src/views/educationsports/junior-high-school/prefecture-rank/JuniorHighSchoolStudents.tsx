import RankingJuniorHighSchoolStudents from 'sections/educationsports/junior-high-school/prefecture-rank/RankingJuniorHighSchoolStudents'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function JuniorHighSchoolStudents({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 中学校生徒数 */}
      <PrefectureRankingCards
        Section={RankingJuniorHighSchoolStudents}
        routerProps={routerProps}
      />
    </MainView>
  )
}
