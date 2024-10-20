import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingAgriculturalLandConversionArea from 'sections/agriculture/agriculture/prefecture-rank/RankingAgriculturalLandConversionArea'
import { ViewsPropsType } from 'types/views'

export default async function AgriculturalLandConversionArea({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 農地転用面積 */}
      <PrefectureRankingCards
        Section={RankingAgriculturalLandConversionArea}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
