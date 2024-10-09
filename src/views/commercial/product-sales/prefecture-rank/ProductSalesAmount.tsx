import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import DashboardProductSalesAmount from 'sections/commercial/product-sales/dashboard/DashboardProductSalesAmount'
import { ViewsPropsType } from 'types/views'

export default async function ProductSalesAmount({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 商品販売額 */}
      <PrefectureRankingCards
        Section={DashboardProductSalesAmount}
        routerProps={routerProps}
      />
    </MainView>
  )
}
