import RankingCurrentAccountRatio from 'sections/administrativefinancial/finances/prefecture-rank/RankingCurrentAccountRatio'
import { RouterProps } from 'utils/props'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

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
