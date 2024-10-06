import RankingAmountOfProductOnHand from 'sections/commercial/product-sales/prefecture-rank/RankingAmountOfProductOnHand'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function AmountOfProductOnHand({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 商品手持額 */}
      <PrefectureRankingCards
        Section={RankingAmountOfProductOnHand}
        routerProps={routerProps}
      />
    </MainView>
  )
}
