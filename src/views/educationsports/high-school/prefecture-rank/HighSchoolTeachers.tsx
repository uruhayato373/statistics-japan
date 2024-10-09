import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingHighSchoolTeachers from 'sections/educationsports/high-school/prefecture-rank/RankingHighSchoolTeachers'
import { ViewsPropsType } from 'types/views'

export default async function HighSchoolTeachers({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 高等学校教員数 */}
      <PrefectureRankingCards
        Section={RankingHighSchoolTeachers}
        routerProps={routerProps}
      />
    </MainView>
  )
}
