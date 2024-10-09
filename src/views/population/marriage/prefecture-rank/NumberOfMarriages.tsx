import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingNumberOfMarriages from 'sections/population/marriage/prefecture-rank/RankingNumberOfMarriages'
import { ViewsPropsType } from 'types/views'

export default async function NumberOfMarriages({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 婚姻件数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfMarriages}
        routerProps={routerProps}
      />
    </MainView>
  )
}
