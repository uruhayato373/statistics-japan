import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingNumberOfSingleHouseholds from 'sections/population/household/prefecture-rank/RankingNumberOfSingleHouseholds'
import { ViewsPropsType } from 'types/views'

export default async function NumberOfSingleHouseholds({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 単独世帯数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfSingleHouseholds}
        routerProps={routerProps}
      />
    </MainView>
  )
}
