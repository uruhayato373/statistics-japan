import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingNumberOfTrafficAccidentInjuries from 'sections/safetyenvironment/traffic-accident/prefecture-rank/RankingNumberOfTrafficAccidentInjuries'

import { ViewsPropsType } from 'types/views'

export default async function NumberOfTrafficAccidentInjuries({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 交通事故負傷者数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfTrafficAccidentInjuries}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
