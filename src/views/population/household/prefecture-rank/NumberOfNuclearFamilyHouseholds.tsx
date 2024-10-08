import RankingNumberOfNuclearFamilyHouseholds from 'sections/population/household/prefecture-rank/RankingNumberOfNuclearFamilyHouseholds'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

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
