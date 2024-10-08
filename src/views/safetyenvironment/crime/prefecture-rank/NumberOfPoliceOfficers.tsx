import RankingNumberOfPoliceOfficers from 'sections/safetyenvironment/crime/prefecture-rank/RankingNumberOfPoliceOfficers'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function NumberOfPoliceOfficers({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 警察官数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfPoliceOfficers}
        routerProps={routerProps}
      />
    </MainView>
  )
}
