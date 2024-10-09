import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingHighSchoolStudents from 'sections/educationsports/high-school/prefecture-rank/RankingHighSchoolStudents'
import { ViewsPropsType } from 'types/views'

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
