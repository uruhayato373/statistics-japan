import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingNumberOfHospitals from 'sections/socialsecurity/hospital/prefecture-rank/RankingNumberOfHospitals'

import { ViewsPropsType } from 'types/views'

export default async function NumberOfHospitals({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 病院数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfHospitals}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
