import RankingFinancialStrengthIndex from 'sections/administrativefinancial/finances/prefecture-rank/RankingFinancialStrengthIndex'
import { RouterProps } from 'utils/props'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

interface Props {
  routerProps: RouterProps
}

export default async function PrefectureRankView({ routerProps }: Props) {
  return (
    <MainView routerProps={routerProps}>
      {/* 財政力指数 */}
      <PrefectureRankingCards
        Section={RankingFinancialStrengthIndex}
        routerProps={routerProps}
      />
    </MainView>
  )
}
