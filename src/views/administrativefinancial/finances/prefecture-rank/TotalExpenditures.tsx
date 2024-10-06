import RankingTotalExpenditures from 'sections/administrativefinancial/finances/prefecture-rank/RankingTotalExpenditures'
import { RouterProps } from 'utils/props'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

interface Props {
  routerProps: RouterProps
}

export default async function PrefectureRankView({ routerProps }: Props) {
  return (
    <MainView routerProps={routerProps}>
      {/* 歳出決算総額 */}
      <PrefectureRankingCards
        Section={RankingTotalExpenditures}
        routerProps={routerProps}
      />
    </MainView>
  )
}
