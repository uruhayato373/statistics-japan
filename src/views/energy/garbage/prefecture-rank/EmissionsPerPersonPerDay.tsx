import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingEmissionsPerPersonPerDay from 'sections/energy/garbage/prefecture-rank/RankingEmissionsPerPersonPerDay'
import { ViewsPropsType } from 'types/views'

export default async function EmissionsPerPersonPerDay({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 一人一日当たり排出量 */}
      <PrefectureRankingCards
        Section={RankingEmissionsPerPersonPerDay}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
