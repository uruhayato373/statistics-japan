import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingNumberOfHospitals from 'sections/socialsecurity/hospital/prefecture-rank/RankingNumberOfHospitals'
import { ViewsPropsType } from 'types/views'

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
