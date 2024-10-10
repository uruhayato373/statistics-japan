import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingNumberOfSingleFatherHouseholds from 'sections/population/household/prefecture-rank/RankingNumberOfSingleFatherHouseholds'
import { ViewsPropsType } from 'types/views'

export default async function NumberOfSingleFatherHouseholds({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 父子世帯数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfSingleFatherHouseholds}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
