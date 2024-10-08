import RankingNumberOfSingleFatherHouseholds from 'sections/population/household/prefecture-rank/RankingNumberOfSingleFatherHouseholds'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function NumberOfSingleFatherHouseholds({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 父子世帯数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfSingleFatherHouseholds}
        routerProps={routerProps}
      />
    </MainView>
  )
}
