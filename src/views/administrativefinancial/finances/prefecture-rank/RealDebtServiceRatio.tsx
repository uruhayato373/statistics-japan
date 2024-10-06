import RankingRealDebtServiceRatio from 'sections/administrativefinancial/finances/prefecture-rank/RankingRealDebtServiceRatio'
import { RouterProps } from 'utils/props'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

interface Props {
  routerProps: RouterProps
}

export default async function PrefectureRankView({ routerProps }: Props) {
  return (
    <MainView routerProps={routerProps}>
      {/* 実質公債費比率 */}
      <PrefectureRankingCards
        Section={RankingRealDebtServiceRatio}
        routerProps={routerProps}
      />
    </MainView>
  )
}
