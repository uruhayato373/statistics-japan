import RankingNumberOfFireStations from 'sections/safetyenvironment/fire/prefecture-rank/RankingNumberOfFireStations'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function NumberOfFireStations({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 消防本部・署数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfFireStations}
        routerProps={routerProps}
      />
    </MainView>
  )
}
