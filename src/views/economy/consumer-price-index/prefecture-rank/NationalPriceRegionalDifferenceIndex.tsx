import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingNationalPriceRegionalDifferenceIndex from 'sections/economy/consumer-price-index/prefecture-rank/RankingNationalPriceRegionalDifferenceIndex'
import { ViewsPropsType } from 'types/views'

export default async function NationalPriceRegionalDifferenceIndex({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 全国物価地域差指数 */}
      <PrefectureRankingCards
        Section={RankingNationalPriceRegionalDifferenceIndex}
        routerProps={routerProps}
      />
    </MainView>
  )
}
