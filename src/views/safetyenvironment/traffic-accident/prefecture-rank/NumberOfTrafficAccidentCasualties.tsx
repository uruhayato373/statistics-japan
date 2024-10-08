import RankingNumberOfTrafficAccidentCasualties from 'sections/safetyenvironment/traffic-accident/prefecture-rank/RankingNumberOfTrafficAccidentCasualties'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function NumberOfTrafficAccidentCasualties({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 交通事故件数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfTrafficAccidentCasualties}
        routerProps={routerProps}
      />
    </MainView>
  )
}
