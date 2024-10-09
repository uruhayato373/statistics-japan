import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingTotalRevenueSettlement from 'sections/administrativefinancial/finances/prefecture-rank/RankingTotalRevenueSettlement'
import { RouterProps } from 'utils/props'

interface Props {
  routerProps: RouterProps
}

export default async function PrefectureRankView({ routerProps }: Props) {
  return (
    <MainView routerProps={routerProps}>
      {/* 歳入決算総額 */}
      <PrefectureRankingCards
        Section={RankingTotalRevenueSettlement}
        routerProps={routerProps}
      />
    </MainView>
  )
}
