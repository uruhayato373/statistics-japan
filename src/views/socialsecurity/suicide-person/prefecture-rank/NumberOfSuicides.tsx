import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingNumberOfSuicides from 'sections/socialsecurity/suicide-person/prefecture-rank/RankingNumberOfSuicides'
import { ViewsPropsType } from 'types/views'

export default async function NumberOfSuicides({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 自殺者数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfSuicides}
        routerProps={routerProps}
      />
    </MainView>
  )
}
