import RankingAquacultureYield from 'sections/agriculture/fishing/prefecture-rank/RankingAquacultureYield'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function AquacultureYield({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 養殖収穫量 */}
      <PrefectureRankingCards
        Section={RankingAquacultureYield}
        routerProps={routerProps}
      />
    </MainView>
  )
}
