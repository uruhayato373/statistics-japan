import RankingForeignPopulation from 'sections/international/foreigner/prefecture-rank/RankingForeignPopulation'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function ForeignPopulation({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 外国人人口 */}
      <PrefectureRankingCards
        Section={RankingForeignPopulation}
        routerProps={routerProps}
      />
    </MainView>
  )
}
