import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingTrafficAccidentFatalities from 'sections/safetyenvironment/traffic-accident/prefecture-rank/RankingTrafficAccidentFatalities'
import { ViewsPropsType } from 'types/views'

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
