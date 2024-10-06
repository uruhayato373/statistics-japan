import RankingFutureBurdenRatio from 'sections/administrativefinancial/finances/prefecture-rank/RankingFutureBurdenRatio'
import { RouterProps } from 'utils/props'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

interface Props {
  routerProps: RouterProps
}

export default async function PrefectureRankView({ routerProps }: Props) {
  return (
    <MainView routerProps={routerProps}>
      {/* 将来負担比率 */}
      <PrefectureRankingCards
        Section={RankingFutureBurdenRatio}
        routerProps={routerProps}
      />
    </MainView>
  )
}
