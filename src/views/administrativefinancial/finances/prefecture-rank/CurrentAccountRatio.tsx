import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingCurrentAccountRatio from 'sections/administrativefinancial/finances/prefecture-rank/RankingCurrentAccountRatio'
import { RouterProps } from 'utils/props'

interface Props {
  routerProps: RouterProps
}

export default async function PrefectureRankView({ routerProps }: Props) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 経常収支比率 */}
      <PrefectureRankingCards
        Section={RankingCurrentAccountRatio}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
