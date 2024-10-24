import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingPrimarySchoolStudents from 'sections/educationsports/primary-school/prefecture-rank/RankingPrimarySchoolStudents'

import { ViewsPropsType } from 'types/views'

export default async function PrimarySchoolStudents({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 小学児童数 */}
      <PrefectureRankingCards
        Section={RankingPrimarySchoolStudents}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
