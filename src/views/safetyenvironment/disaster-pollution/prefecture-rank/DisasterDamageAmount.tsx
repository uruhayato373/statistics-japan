import RankingDisasterDamageAmount from 'sections/safetyenvironment/disaster-pollution/prefecture-rank/RankingDisasterDamageAmount'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function DisasterDamageAmount({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 災害被害額 */}
      <PrefectureRankingCards
        Section={RankingDisasterDamageAmount}
        routerProps={routerProps}
      />
    </MainView>
  )
}
