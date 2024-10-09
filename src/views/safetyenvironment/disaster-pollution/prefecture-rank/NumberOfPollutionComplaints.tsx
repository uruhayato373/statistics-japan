import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingNumberOfPollutionComplaints from 'sections/safetyenvironment/disaster-pollution/prefecture-rank/RankingNumberOfPollutionComplaints'
import { ViewsPropsType } from 'types/views'

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
