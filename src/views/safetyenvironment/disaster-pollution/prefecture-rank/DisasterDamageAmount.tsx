import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingDisasterDamageAmount from 'sections/safetyenvironment/disaster-pollution/prefecture-rank/RankingDisasterDamageAmount'

import { ViewsPropsType } from 'types/views'

export default async function DisasterDamageAmount({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 災害被害額 */}
      <PrefectureRankingCards
        Section={RankingDisasterDamageAmount}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
