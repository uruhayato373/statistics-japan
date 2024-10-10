import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingConstructionCompanies from 'sections/construction/construction/prefecture-rank/RankingConstructionCompanies'
import { ViewsPropsType } from 'types/views'

export default async function ConstructionCompanies({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 建設業者数 */}
      <PrefectureRankingCards
        Section={RankingConstructionCompanies}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
