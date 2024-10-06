import RankingFisheryOutputValue from 'sections/agriculture/fishing/prefecture-rank/RankingFisheryOutputValue'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function FisheryOutputValue({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 漁業産出額 */}
      <PrefectureRankingCards
        Section={RankingFisheryOutputValue}
        routerProps={routerProps}
      />
    </MainView>
  )
}
