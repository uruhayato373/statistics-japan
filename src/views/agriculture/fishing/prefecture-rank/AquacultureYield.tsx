import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingAquacultureYield from 'sections/agriculture/fishing/prefecture-rank/RankingAquacultureYield'
import { ViewsPropsType } from 'types/views'

export default async function AquacultureYield({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 養殖収穫量 */}
      <PrefectureRankingCards
        Section={RankingAquacultureYield}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
