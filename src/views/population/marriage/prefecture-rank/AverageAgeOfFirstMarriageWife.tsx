import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingAverageAgeOfFirstMarriageWife from 'sections/population/marriage/prefecture-rank/RankingAverageAgeOfFirstMarriageWife'
import { ViewsPropsType } from 'types/views'

export default async function AverageAgeOfFirstMarriageWife({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 平均初婚年齢（妻） */}
      <PrefectureRankingCards
        Section={RankingAverageAgeOfFirstMarriageWife}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
