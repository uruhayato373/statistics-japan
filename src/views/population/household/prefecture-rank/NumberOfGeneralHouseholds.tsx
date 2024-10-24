import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingNumberOfGeneralHouseholds from 'sections/population/household/prefecture-rank/RankingNumberOfGeneralHouseholds'

import { ViewsPropsType } from 'types/views'

export default async function NumberOfGeneralHouseholds({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 一般世帯数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfGeneralHouseholds}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
