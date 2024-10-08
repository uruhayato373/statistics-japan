import RankingJuniorHighSchoolTeachers from 'sections/educationsports/junior-high-school/prefecture-rank/RankingJuniorHighSchoolTeachers'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function JuniorHighSchoolTeachers({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 中学校教員数 */}
      <PrefectureRankingCards
        Section={RankingJuniorHighSchoolTeachers}
        routerProps={routerProps}
      />
    </MainView>
  )
}
