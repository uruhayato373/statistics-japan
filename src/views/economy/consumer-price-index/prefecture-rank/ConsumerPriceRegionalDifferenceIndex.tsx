import RankingConsumerPriceRegionalDifferenceIndex from 'sections/economy/consumer-price-index/prefecture-rank/RankingConsumerPriceRegionalDifferenceIndex'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function ConsumerPriceRegionalDifferenceIndex({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 消費者物価地域差指数 */}
      <PrefectureRankingCards
        Section={RankingConsumerPriceRegionalDifferenceIndex}
        routerProps={routerProps}
      />
    </MainView>
  )
}
