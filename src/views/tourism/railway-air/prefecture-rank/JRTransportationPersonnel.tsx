import RankingJRTransportationPersonnel from 'sections/tourism/railway-air/prefecture-rank/RankingJRTransportationPersonnel'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function JRTransportationPersonnel({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* JR輸送人員 */}
      <PrefectureRankingCards
        Section={RankingJRTransportationPersonnel}
        routerProps={routerProps}
      />
    </MainView>
  )
}
