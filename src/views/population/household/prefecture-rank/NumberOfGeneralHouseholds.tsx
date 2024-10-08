import RankingNumberOfGeneralHouseholds from 'sections/population/household/prefecture-rank/RankingNumberOfGeneralHouseholds'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

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
