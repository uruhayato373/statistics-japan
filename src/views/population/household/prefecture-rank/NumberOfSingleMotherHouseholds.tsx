import RankingNumberOfSingleMotherHouseholds from 'sections/population/household/prefecture-rank/RankingNumberOfSingleMotherHouseholds'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function NumberOfSingleMotherHouseholds({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 母子世帯数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfSingleMotherHouseholds}
        routerProps={routerProps}
      />
    </MainView>
  )
}
