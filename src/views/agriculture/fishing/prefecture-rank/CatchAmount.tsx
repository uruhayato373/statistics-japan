import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingCatchAmount from 'sections/agriculture/fishing/prefecture-rank/RankingCatchAmount'
import { ViewsPropsType } from 'types/views'

export default async function CatchAmount({ routerProps }: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 漁獲量 */}
      <PrefectureRankingCards
        Section={RankingCatchAmount}
        routerProps={routerProps}
      />
    </MainView>
  )
}
