import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingTotalNumberOfHouses from 'sections/construction/housing/prefecture-rank/RankingTotalNumberOfHouses'
import { ViewsPropsType } from 'types/views'

export default async function TotalNumberOfHouses({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 総住宅数 */}
      <PrefectureRankingCards
        Section={RankingTotalNumberOfHouses}
        routerProps={routerProps}
      />
    </MainView>
  )
}
