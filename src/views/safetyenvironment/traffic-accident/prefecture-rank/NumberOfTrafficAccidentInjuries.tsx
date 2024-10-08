import RankingNumberOfTrafficAccidentInjuries from 'sections/safetyenvironment/traffic-accident/prefecture-rank/RankingNumberOfTrafficAccidentInjuries'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function NumberOfTrafficAccidentInjuries({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 交通事故負傷者数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfTrafficAccidentInjuries}
        routerProps={routerProps}
      />
    </MainView>
  )
}
