import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingNumberOfNuclearFamilyHouseholds from 'sections/population/household/prefecture-rank/RankingNumberOfNuclearFamilyHouseholds'
import { ViewsPropsType } from 'types/views'

export default async function NumberOfNuclearFamilyHouseholds({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 核家族世帯数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfNuclearFamilyHouseholds}
        routerProps={routerProps}
      />
    </MainView>
  )
}
