import RankingPrimarySchoolStudents from 'sections/educationsports/primary-school/prefecture-rank/RankingPrimarySchoolStudents'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function PrimarySchoolStudents({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 小学児童数 */}
      <PrefectureRankingCards
        Section={RankingPrimarySchoolStudents}
        routerProps={routerProps}
      />
    </MainView>
  )
}
