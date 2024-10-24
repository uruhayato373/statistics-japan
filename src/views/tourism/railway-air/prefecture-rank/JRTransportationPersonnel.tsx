import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingJRTransportationPersonnel from 'sections/tourism/railway-air/prefecture-rank/RankingJRTransportationPersonnel'

import { ViewsPropsType } from 'types/views'

export default async function JRTransportationPersonnel({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* JR輸送人員 */}
      <PrefectureRankingCards
        Section={RankingJRTransportationPersonnel}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
