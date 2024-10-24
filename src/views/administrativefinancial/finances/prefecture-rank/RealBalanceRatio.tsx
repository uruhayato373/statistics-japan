import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingRealBalanceRatio from 'sections/administrativefinancial/finances/prefecture-rank/RankingRealBalanceRatio'

import { RouterPropsType } from 'types/apps'

interface Props {
  routerProps: RouterPropsType
}

export default async function PrefectureRankView({ routerProps }: Props) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 実質収支比率 */}
      <PrefectureRankingCards
        Section={RankingRealBalanceRatio}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
