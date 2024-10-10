import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingStandardFinancialIncomeAmount from 'sections/administrativefinancial/finances/prefecture-rank/RankingStandardFinancialIncomeAmount'
import { RouterProps } from 'utils/props'

interface Props {
  routerProps: RouterProps
}

export default async function PrefectureRankView({ routerProps }: Props) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 基準財政収入額 */}
      <PrefectureRankingCards
        Section={RankingStandardFinancialIncomeAmount}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
