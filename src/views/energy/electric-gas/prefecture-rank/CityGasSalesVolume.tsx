import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingCityGasSalesVolume from 'sections/energy/electric-gas/prefecture-rank/RankingCityGasSalesVolume'
import { ViewsPropsType } from 'types/views'

export default async function CityGasSalesVolume({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 都市ガス販売量 */}
      <PrefectureRankingCards
        Section={RankingCityGasSalesVolume}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
