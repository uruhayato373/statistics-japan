import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingNumberOfDeaths from 'sections/population/birthdeath/prefecture-rank/RankingNumberOfDeaths'
import { ViewsPropsType } from 'types/views'

export default async function NumberOfDeaths({ routerProps }: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 死亡数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfDeaths}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
