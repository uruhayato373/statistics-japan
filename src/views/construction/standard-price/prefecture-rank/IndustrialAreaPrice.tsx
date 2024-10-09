import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingIndustrialAreaPrice from 'sections/construction/standard-price/prefecture-rank/RankingIndustrialAreaPrice'
import { ViewsPropsType } from 'types/views'

export default async function IndustrialAreaPrice({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 工業地価格 */}
      <PrefectureRankingCards
        Section={RankingIndustrialAreaPrice}
        routerProps={routerProps}
      />
    </MainView>
  )
}
