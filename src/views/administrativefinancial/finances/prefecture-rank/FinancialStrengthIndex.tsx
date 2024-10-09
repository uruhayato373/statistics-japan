import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingFinancialStrengthIndex from 'sections/administrativefinancial/finances/prefecture-rank/RankingFinancialStrengthIndex'
import { RouterProps } from 'utils/props'

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
