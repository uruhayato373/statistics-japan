import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingAverageAgeOfFirstMarriageWife from 'sections/population/marriage/prefecture-rank/RankingAverageAgeOfFirstMarriageWife'
import { ViewsPropsType } from 'types/views'

export default async function AverageAgeOfFirstMarriageWife({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 平均初婚年齢（妻） */}
      <PrefectureRankingCards
        Section={RankingAverageAgeOfFirstMarriageWife}
        routerProps={routerProps}
      />
    </MainView>
  )
}
