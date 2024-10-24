import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingNumberOfDisasterAffectedHousingUnits from 'sections/safetyenvironment/disaster-pollution/prefecture-rank/RankingNumberOfDisasterAffectedHousingUnits'

import { ViewsPropsType } from 'types/views'

export default async function NumberOfDisasterAffectedHousingUnits({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 災害住宅戸数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfDisasterAffectedHousingUnits}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
