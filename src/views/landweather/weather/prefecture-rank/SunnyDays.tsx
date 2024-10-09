import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingSunnyDays from 'sections/landweather/weather/prefecture-rank/RankingSunnyDays'
import { ViewsPropsType } from 'types/views'

export default async function SunnyDays({ routerProps }: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 日 */}
      <PrefectureRankingCards
        Section={RankingSunnyDays}
        routerProps={routerProps}
      />
    </MainView>
  )
}
