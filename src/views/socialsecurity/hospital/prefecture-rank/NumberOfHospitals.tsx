import RankingNumberOfHospitals from 'sections/socialsecurity/hospital/prefecture-rank/RankingNumberOfHospitals'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function NumberOfHospitals({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 病院数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfHospitals}
        routerProps={routerProps}
      />
    </MainView>
  )
}
