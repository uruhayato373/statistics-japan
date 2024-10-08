import RankingGeneratedPowerAmount from 'sections/energy/electric-gas/prefecture-rank/RankingGeneratedPowerAmount'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function GeneratedPowerAmount({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 発電電力量 */}
      <PrefectureRankingCards
        Section={RankingGeneratedPowerAmount}
        routerProps={routerProps}
      />
    </MainView>
  )
}
