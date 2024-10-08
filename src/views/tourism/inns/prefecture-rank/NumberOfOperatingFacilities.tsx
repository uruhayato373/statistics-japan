import RankingNumberOfOperatingFacilities from 'sections/tourism/inns/prefecture-rank/RankingNumberOfOperatingFacilities'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function NumberOfOperatingFacilities({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 旅館等営業施設数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfOperatingFacilities}
        routerProps={routerProps}
      />
    </MainView>
  )
}
