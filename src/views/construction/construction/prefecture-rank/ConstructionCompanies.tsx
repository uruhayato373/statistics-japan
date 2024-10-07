import RankingConstructionCompanies from 'sections/construction/construction/prefecture-rank/RankingConstructionCompanies'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function ConstructionCompanies({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 建設業者数 */}
      <PrefectureRankingCards
        Section={RankingConstructionCompanies}
        routerProps={routerProps}
      />
    </MainView>
  )
}
