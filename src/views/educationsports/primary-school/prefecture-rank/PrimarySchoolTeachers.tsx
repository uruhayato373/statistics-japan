import RankingPrimarySchoolTeachers from 'sections/educationsports/primary-school/prefecture-rank/RankingPrimarySchoolTeachers'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function PrimarySchoolTeachers({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 小学教員数 */}
      <PrefectureRankingCards
        Section={RankingPrimarySchoolTeachers}
        routerProps={routerProps}
      />
    </MainView>
  )
}
