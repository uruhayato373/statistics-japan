import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingCurrentAccountRatio from 'sections/administrativefinancial/finances/prefecture-rank/RankingCurrentAccountRatio'
import { RouterProps } from 'utils/props'

interface Props {
  routerProps: RouterProps
}

export default async function PrefectureRankView({ routerProps }: Props) {
  return (
    <MainView routerProps={routerProps}>
      {/* 経常収支比率 */}
      <PrefectureRankingCards
        Section={RankingCurrentAccountRatio}
        routerProps={routerProps}
      />
    </MainView>
  )
}
