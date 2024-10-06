import RankingNumberOfCommercialEmployees from 'sections/commercial/product-sales/prefecture-rank/RankingNumberOfCommercialEmployees'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function NumberOfCommercialEmployees({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 商業従業者数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfCommercialEmployees}
        routerProps={routerProps}
      />
    </MainView>
  )
}
