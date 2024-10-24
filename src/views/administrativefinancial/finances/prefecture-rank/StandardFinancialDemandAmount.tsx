import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingStandardFinancialDemandAmount from 'sections/administrativefinancial/finances/prefecture-rank/RankingStandardFinancialDemandAmount'

import { RouterPropsType } from 'types/apps'

interface Props {
  routerProps: RouterPropsType
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
