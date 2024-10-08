import RankingNumberOfPollutionComplaints from 'sections/safetyenvironment/disaster-pollution/prefecture-rank/RankingNumberOfPollutionComplaints'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function NumberOfPollutionComplaints({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 公害苦情件数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfPollutionComplaints}
        routerProps={routerProps}
      />
    </MainView>
  )
}
