import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingProductSalesAmount from 'sections/commercial/product-sales/prefecture-rank/RankingProductSalesAmount'
import { ViewsPropsType } from 'types/views'

export default async function ProductSalesAmount({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 商品販売額 */}
      <PrefectureRankingCards
        Section={RankingProductSalesAmount}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
