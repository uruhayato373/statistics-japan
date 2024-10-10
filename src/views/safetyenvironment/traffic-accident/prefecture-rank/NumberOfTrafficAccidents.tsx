import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingNumberOfTrafficAccidents from 'sections/safetyenvironment/traffic-accident/prefecture-rank/RankingNumberOfTrafficAccidents'
import { ViewsPropsType } from 'types/views'

export default async function NumberOfTrafficAccidents({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 交通事故件数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfTrafficAccidents}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
