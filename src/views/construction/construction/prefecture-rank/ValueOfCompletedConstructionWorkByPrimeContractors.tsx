import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingValueOfCompletedConstructionWorkByPrimeContractors from 'sections/construction/construction/prefecture-rank/RankingValueOfCompletedConstructionWorkByPrimeContractors'
import { ViewsPropsType } from 'types/views'

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
