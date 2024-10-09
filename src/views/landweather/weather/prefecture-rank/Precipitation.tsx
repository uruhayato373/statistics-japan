import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingPrecipitation from 'sections/landweather/weather/prefecture-rank/RankingPrecipitation'
import { ViewsPropsType } from 'types/views'

export default async function Precipitation({ routerProps }: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 降水量 */}
      <PrefectureRankingCards
        Section={RankingPrecipitation}
        routerProps={routerProps}
      />
    </MainView>
  )
}
