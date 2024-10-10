import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingNumberOfCommercialEmployees from 'sections/commercial/product-sales/prefecture-rank/RankingNumberOfCommercialEmployees'
import { ViewsPropsType } from 'types/views'

export default async function NumberOfCommercialEmployees({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 商業従業者数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfCommercialEmployees}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
