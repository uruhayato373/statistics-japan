import RankingRealBalanceRatio from 'sections/administrativefinancial/finances/prefecture-rank/RankingRealBalanceRatio'
import { RouterProps } from 'utils/props'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

interface Props {
  routerProps: RouterProps
}

export default async function PrefectureRankView({ routerProps }: Props) {
  return (
    <MainView routerProps={routerProps}>
      {/* 実質収支比率 */}
      <PrefectureRankingCards
        Section={RankingRealBalanceRatio}
        routerProps={routerProps}
      />
    </MainView>
  )
}
