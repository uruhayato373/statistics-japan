import RankingConsumerPriceIndexChangeRate from 'sections/economy/consumer-price-index/prefecture-rank/RankingConsumerPriceIndexChangeRate'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function ConsumerPriceIndexChangeRate({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 消費者物価指数変化率 */}
      <PrefectureRankingCards
        Section={RankingConsumerPriceIndexChangeRate}
        routerProps={routerProps}
      />
    </MainView>
  )
}
