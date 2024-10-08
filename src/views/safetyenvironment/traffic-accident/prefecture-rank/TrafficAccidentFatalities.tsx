import RankingTrafficAccidentFatalities from 'sections/safetyenvironment/traffic-accident/prefecture-rank/RankingTrafficAccidentFatalities'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function TrafficAccidentFatalities({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 交通事故死者数 */}
      <PrefectureRankingCards
        Section={RankingTrafficAccidentFatalities}
        routerProps={routerProps}
      />
    </MainView>
  )
}
