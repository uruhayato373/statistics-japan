import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingHighSchoolStudents from 'sections/educationsports/high-school/prefecture-rank/RankingHighSchoolStudents'

import { ViewsPropsType } from 'types/views'

export default async function HighSchoolStudents({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 高等学校生徒数数 */}
      <PrefectureRankingCards
        Section={RankingHighSchoolStudents}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
