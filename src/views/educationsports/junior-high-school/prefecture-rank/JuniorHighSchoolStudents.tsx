import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingJuniorHighSchoolStudents from 'sections/educationsports/junior-high-school/prefecture-rank/RankingJuniorHighSchoolStudents'

import { ViewsPropsType } from 'types/views'

export default async function JuniorHighSchoolStudents({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 中学校生徒数 */}
      <PrefectureRankingCards
        Section={RankingJuniorHighSchoolStudents}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
