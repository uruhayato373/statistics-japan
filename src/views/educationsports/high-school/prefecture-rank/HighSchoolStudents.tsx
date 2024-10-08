import RankingHighSchoolStudents from 'sections/educationsports/high-school/prefecture-rank/RankingHighSchoolStudents'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function HighSchoolStudents({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 高等学校生徒数数 */}
      <PrefectureRankingCards
        Section={RankingHighSchoolStudents}
        routerProps={routerProps}
      />
    </MainView>
  )
}
