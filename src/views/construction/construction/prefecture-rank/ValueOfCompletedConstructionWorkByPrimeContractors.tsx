import RankingValueOfCompletedConstructionWorkByPrimeContractors from 'sections/construction/construction/prefecture-rank/RankingValueOfCompletedConstructionWorkByPrimeContractors'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function ValueOfCompletedConstructionWorkByPrimeContractors({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 元請完成工事高 */}
      <PrefectureRankingCards
        Section={RankingValueOfCompletedConstructionWorkByPrimeContractors}
        routerProps={routerProps}
      />
    </MainView>
  )
}
