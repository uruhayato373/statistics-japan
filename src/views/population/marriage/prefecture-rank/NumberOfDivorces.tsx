import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingNumberOfDivorces from 'sections/population/marriage/prefecture-rank/RankingNumberOfDivorces'
import { ViewsPropsType } from 'types/views'

export default async function NumberOfDivorces({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 離婚件数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfDivorces}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
