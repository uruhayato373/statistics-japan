import RankingNumberOfFishermenEmployed from 'sections/agriculture/fishing/prefecture-rank/RankingNumberOfFishermenEmployed'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

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
