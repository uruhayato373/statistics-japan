import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingNumberOfDivorces from 'sections/population/marriage/prefecture-rank/RankingNumberOfDivorces'
import { ViewsPropsType } from 'types/views'

export default async function NumberOfDivorces({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 離婚件数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfDivorces}
        routerProps={routerProps}
      />
    </MainView>
  )
}
