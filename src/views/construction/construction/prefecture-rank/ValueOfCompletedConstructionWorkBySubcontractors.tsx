import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingValueOfCompletedConstructionWorkBySubcontractors from 'sections/construction/construction/prefecture-rank/RankingValueOfCompletedConstructionWorkBySubcontractors'
import { ViewsPropsType } from 'types/views'

export default async function ValueOfCompletedConstructionWorkBySubcontractors({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 下請完成工事高 */}
      <PrefectureRankingCards
        Section={RankingValueOfCompletedConstructionWorkBySubcontractors}
        routerProps={routerProps}
      />
    </MainView>
  )
}
