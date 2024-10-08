import RankingNumberOfDivorces from 'sections/population/marriage/prefecture-rank/RankingNumberOfDivorces'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function NumberOfDivorces({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 離婚件数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfDivorces}
        routerProps={routerProps}
      />
    </MainView>
  )
}
