import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingAmountOfProductOnHand from 'sections/commercial/product-sales/prefecture-rank/RankingAmountOfProductOnHand'

import { ViewsPropsType } from 'types/views'

export default async function AmountOfProductOnHand({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 商品手持額 */}
      <PrefectureRankingCards
        Section={RankingAmountOfProductOnHand}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
