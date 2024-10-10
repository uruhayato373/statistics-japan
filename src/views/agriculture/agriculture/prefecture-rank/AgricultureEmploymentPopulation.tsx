import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingAgricultureEmploymentPopulation from 'sections/agriculture/agriculture/prefecture-rank/RankingAgricultureEmploymentPopulation'
import { ViewsPropsType } from 'types/views'

export default async function AgricultureEmploymentPopulation({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 農業就業人口 */}
      <PrefectureRankingCards
        Section={RankingAgricultureEmploymentPopulation}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
