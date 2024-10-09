import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingConstructionCompanies from 'sections/construction/construction/prefecture-rank/RankingConstructionCompanies'
import { ViewsPropsType } from 'types/views'

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
