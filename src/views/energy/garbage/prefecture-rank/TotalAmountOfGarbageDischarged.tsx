import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingTotalAmountOfGarbageDischarged from 'sections/energy/garbage/prefecture-rank/RankingTotalAmountOfGarbageDischarged'
import { ViewsPropsType } from 'types/views'

export default async function TotalAmountOfGarbageDischarged({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* ごみ総排出量 */}
      <PrefectureRankingCards
        Section={RankingTotalAmountOfGarbageDischarged}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
