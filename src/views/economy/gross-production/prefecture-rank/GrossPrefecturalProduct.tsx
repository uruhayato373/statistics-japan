import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingGrossPrefecturalProduct from 'sections/economy/gross-production/prefecture-rank/RankingGrossPrefecturalProduct'
import { ViewsPropsType } from 'types/views'

export default async function GrossPrefecturalProduct({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 県内総生産 */}
      <PrefectureRankingCards
        Section={RankingGrossPrefecturalProduct}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
