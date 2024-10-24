import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingNumberOfOperatingFacilities from 'sections/tourism/inns/prefecture-rank/RankingNumberOfOperatingFacilities'

import { ViewsPropsType } from 'types/views'

export default async function NumberOfOperatingFacilities({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 旅館等営業施設数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfOperatingFacilities}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
