import RankingNumberOfBirths from 'sections/population/birthdeath/prefecture-rank/RankingNumberOfBirths'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function NumberOfBirths({ routerProps }: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 出生数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfBirths}
        routerProps={routerProps}
      />
    </MainView>
  )
}
