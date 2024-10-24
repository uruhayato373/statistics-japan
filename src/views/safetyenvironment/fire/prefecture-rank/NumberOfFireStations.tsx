import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingNumberOfFireStations from 'sections/safetyenvironment/fire/prefecture-rank/RankingNumberOfFireStations'

import { ViewsPropsType } from 'types/views'

export default async function NumberOfFireStations({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 消防本部・署数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfFireStations}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
