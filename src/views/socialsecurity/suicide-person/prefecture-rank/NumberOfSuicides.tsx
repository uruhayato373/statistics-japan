import RankingNumberOfSuicides from 'sections/socialsecurity/suicide-person/prefecture-rank/RankingNumberOfSuicides'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function NumberOfSuicides({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 自殺者数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfSuicides}
        routerProps={routerProps}
      />
    </MainView>
  )
}
