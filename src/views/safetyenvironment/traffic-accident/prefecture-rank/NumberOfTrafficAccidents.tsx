import RankingNumberOfTrafficAccidents from 'sections/safetyenvironment/traffic-accident/prefecture-rank/RankingNumberOfTrafficAccidents'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function NumberOfTrafficAccidents({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 交通事故件数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfTrafficAccidents}
        routerProps={routerProps}
      />
    </MainView>
  )
}
