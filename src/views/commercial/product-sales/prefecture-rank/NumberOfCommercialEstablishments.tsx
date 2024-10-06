import RankingNumberOfCommercialEstablishments from 'sections/commercial/product-sales/prefecture-rank/RankingNumberOfCommercialEstablishments'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function NumberOfCommercialEstablishments({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 商業事業所数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfCommercialEstablishments}
        routerProps={routerProps}
      />
    </MainView>
  )
}
