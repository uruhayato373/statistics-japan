import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingRealDebtServiceRatio from 'sections/administrativefinancial/finances/prefecture-rank/RankingRealDebtServiceRatio'
import { RouterProps } from 'utils/props'

interface Props {
  routerProps: RouterProps
}

export default async function PrefectureRankView({ routerProps }: Props) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 実質公債費比率 */}
      <PrefectureRankingCards
        Section={RankingRealDebtServiceRatio}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
