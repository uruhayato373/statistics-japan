import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingJuniorHighSchoolTeachers from 'sections/educationsports/junior-high-school/prefecture-rank/RankingJuniorHighSchoolTeachers'
import { ViewsPropsType } from 'types/views'

export default async function JuniorHighSchoolTeachers({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 中学校教員数 */}
      <PrefectureRankingCards
        Section={RankingJuniorHighSchoolTeachers}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
