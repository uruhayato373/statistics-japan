import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingNumberOfGeneralHouseholds from 'sections/population/household/prefecture-rank/RankingNumberOfGeneralHouseholds'
import { ViewsPropsType } from 'types/views'

export default async function NumberOfGeneralHouseholds({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 一般世帯数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfGeneralHouseholds}
        routerProps={routerProps}
      />
    </MainView>
  )
}
