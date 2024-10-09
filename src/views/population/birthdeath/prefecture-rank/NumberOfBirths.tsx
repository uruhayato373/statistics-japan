import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingNumberOfBirths from 'sections/population/birthdeath/prefecture-rank/RankingNumberOfBirths'
import { ViewsPropsType } from 'types/views'

export default async function NumberOfBirths({ routerProps }: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 出生数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfBirths}
        routerProps={routerProps}
      />
    </MainView>
  )
}
