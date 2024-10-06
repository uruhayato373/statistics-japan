import RankingTotalRevenueSettlement from 'sections/administrativefinancial/finances/prefecture-rank/RankingTotalRevenueSettlement'
import { RouterProps } from 'utils/props'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

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
