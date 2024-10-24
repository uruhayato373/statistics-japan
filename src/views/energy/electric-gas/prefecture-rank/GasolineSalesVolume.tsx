import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingGasolineSalesVolume from 'sections/energy/electric-gas/prefecture-rank/RankingGasolineSalesVolume'

import { ViewsPropsType } from 'types/views'

export default async function GasolineSalesVolume({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* ガソリン販売量 */}
      <PrefectureRankingCards
        Section={RankingGasolineSalesVolume}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
