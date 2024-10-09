import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingNumberOfFishermenEmployed from 'sections/agriculture/fishing/prefecture-rank/RankingNumberOfFishermenEmployed'
import { ViewsPropsType } from 'types/views'

export default async function NumberOfFishermenEmployed({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 漁業就業者数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfFishermenEmployed}
        routerProps={routerProps}
      />
    </MainView>
  )
}
