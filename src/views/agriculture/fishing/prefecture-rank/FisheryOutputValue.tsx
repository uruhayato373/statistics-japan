import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingFisheryOutputValue from 'sections/agriculture/fishing/prefecture-rank/RankingFisheryOutputValue'

import { ViewsPropsType } from 'types/views'

export default async function FisheryOutputValue({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 漁業産出額 */}
      <PrefectureRankingCards
        Section={RankingFisheryOutputValue}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
