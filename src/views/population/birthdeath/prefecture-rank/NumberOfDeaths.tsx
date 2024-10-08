import RankingNumberOfDeaths from 'sections/population/birthdeath/prefecture-rank/RankingNumberOfDeaths'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function NumberOfDeaths({ routerProps }: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 死亡数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfDeaths}
        routerProps={routerProps}
      />
    </MainView>
  )
}
