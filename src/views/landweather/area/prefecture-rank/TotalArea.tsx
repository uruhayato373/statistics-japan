import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingTotalArea from 'sections/landweather/area/prefecture-rank/RankingTotalArea'
import { ViewsPropsType } from 'types/views'

export default async function TotalArea({ routerProps }: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 総面積 */}
      <PrefectureRankingCards
        Section={RankingTotalArea}
        routerProps={routerProps}
      />
    </MainView>
  )
}
