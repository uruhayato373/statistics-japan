import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingTotalExpenditures from 'sections/administrativefinancial/finances/prefecture-rank/RankingTotalExpenditures'
import { RouterProps } from 'utils/props'

interface Props {
  routerProps: RouterProps
}

export default async function PrefectureRankView({ routerProps }: Props) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 歳出決算総額 */}
      <PrefectureRankingCards
        Section={RankingTotalExpenditures}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
