import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingForeignPopulation from 'sections/international/foreigner/prefecture-rank/RankingForeignPopulation'
import { ViewsPropsType } from 'types/views'

export default async function ForeignPopulation({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 外国人人口 */}
      <PrefectureRankingCards
        Section={RankingForeignPopulation}
        routerProps={routerProps}
      />
    </MainView>
  )
}
