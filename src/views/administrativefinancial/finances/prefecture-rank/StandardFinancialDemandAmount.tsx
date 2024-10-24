import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingStandardFinancialDemandAmount from 'sections/administrativefinancial/finances/prefecture-rank/RankingStandardFinancialDemandAmount'
import { RouterProps } from 'utils/props'

interface Props {
  routerProps: RouterProps
}

export default async function PrefectureRankView({ routerProps }: Props) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 基準財政需要額 */}
      <PrefectureRankingCards
        Section={RankingStandardFinancialDemandAmount}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
