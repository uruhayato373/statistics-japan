import RankingNumberOfDisasterAffectedHousingUnits from 'sections/safetyenvironment/disaster-pollution/prefecture-rank/RankingNumberOfDisasterAffectedHousingUnits'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function NumberOfDisasterAffectedHousingUnits({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 災害住宅戸数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfDisasterAffectedHousingUnits}
        routerProps={routerProps}
      />
    </MainView>
  )
}
