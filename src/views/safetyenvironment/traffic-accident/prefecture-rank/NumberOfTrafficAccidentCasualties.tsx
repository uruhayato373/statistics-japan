import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingNumberOfTrafficAccidentCasualties from 'sections/safetyenvironment/traffic-accident/prefecture-rank/RankingNumberOfTrafficAccidentCasualties'
import { ViewsPropsType } from 'types/views'

export default async function NumberOfTrafficAccidentCasualties({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 交通事故件数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfTrafficAccidentCasualties}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
