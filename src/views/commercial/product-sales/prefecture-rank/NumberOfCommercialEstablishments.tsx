import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingNumberOfCommercialEstablishments from 'sections/commercial/product-sales/prefecture-rank/RankingNumberOfCommercialEstablishments'

import { ViewsPropsType } from 'types/views'

export default async function NumberOfCommercialEstablishments({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 商業事業所数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfCommercialEstablishments}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
