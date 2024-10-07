import RankingValueOfCompletedConstructionWorkBySubcontractors from 'sections/construction/construction/prefecture-rank/RankingValueOfCompletedConstructionWorkBySubcontractors'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

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
