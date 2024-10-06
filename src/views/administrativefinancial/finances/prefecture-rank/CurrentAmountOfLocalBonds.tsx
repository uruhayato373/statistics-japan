import RankingCurrentAmountOfLocalBonds from 'sections/administrativefinancial/finances/prefecture-rank/RankingCurrentAmountOfLocalBonds'
import { RouterProps } from 'utils/props'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

interface Props {
  routerProps: RouterProps
}

export default async function PrefectureRankView({ routerProps }: Props) {
  return (
    <MainView routerProps={routerProps}>
      {/* 地方債現在高 */}
      <PrefectureRankingCards
        Section={RankingCurrentAmountOfLocalBonds}
        routerProps={routerProps}
      />
    </MainView>
  )
}
