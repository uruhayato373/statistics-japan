import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingRealDebtServiceRatio from 'sections/administrativefinancial/finances/prefecture-rank/RankingRealDebtServiceRatio'

import { RouterPropsType } from 'types/apps'

interface Props {
  routerProps: RouterPropsType
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
