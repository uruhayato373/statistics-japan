import RankingNumberOfSingleHouseholds from 'sections/population/household/prefecture-rank/RankingNumberOfSingleHouseholds'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

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
