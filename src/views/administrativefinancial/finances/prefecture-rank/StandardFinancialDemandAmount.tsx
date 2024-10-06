import RankingStandardFinancialDemandAmount from 'sections/administrativefinancial/finances/prefecture-rank/RankingStandardFinancialDemandAmount'
import { RouterProps } from 'utils/props'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

interface Props {
  routerProps: RouterProps
}

export default async function PrefectureRankView({ routerProps }: Props) {
  return (
    <MainView routerProps={routerProps}>
      {/* 基準財政需要額 */}
      <PrefectureRankingCards
        Section={RankingStandardFinancialDemandAmount}
        routerProps={routerProps}
      />
    </MainView>
  )
}
