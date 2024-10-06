import RankingStandardFinancialIncomeAmount from 'sections/administrativefinancial/finances/prefecture-rank/RankingStandardFinancialIncomeAmount'
import { RouterProps } from 'utils/props'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

interface Props {
  routerProps: RouterProps
}

export default async function PrefectureRankView({ routerProps }: Props) {
  return (
    <MainView routerProps={routerProps}>
      {/* 基準財政収入額 */}
      <PrefectureRankingCards
        Section={RankingStandardFinancialIncomeAmount}
        routerProps={routerProps}
      />
    </MainView>
  )
}
