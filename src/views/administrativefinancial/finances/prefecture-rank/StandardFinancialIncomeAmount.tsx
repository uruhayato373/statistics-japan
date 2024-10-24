import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingStandardFinancialIncomeAmount from 'sections/administrativefinancial/finances/prefecture-rank/RankingStandardFinancialIncomeAmount'

import { RouterPropsType } from 'types/apps'

interface Props {
  routerProps: RouterPropsType
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
