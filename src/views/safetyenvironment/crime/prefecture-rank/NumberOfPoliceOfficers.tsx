import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingNumberOfPoliceOfficers from 'sections/safetyenvironment/crime/prefecture-rank/RankingNumberOfPoliceOfficers'
import { ViewsPropsType } from 'types/views'

export default async function NumberOfPoliceOfficers({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 警察官数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfPoliceOfficers}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
