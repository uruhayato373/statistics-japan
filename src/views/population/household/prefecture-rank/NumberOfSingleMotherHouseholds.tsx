import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingNumberOfSingleMotherHouseholds from 'sections/population/household/prefecture-rank/RankingNumberOfSingleMotherHouseholds'
import { ViewsPropsType } from 'types/views'

export default async function NumberOfSingleMotherHouseholds({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 母子世帯数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfSingleMotherHouseholds}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
