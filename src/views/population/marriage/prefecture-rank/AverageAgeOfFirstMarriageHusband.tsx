import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingAverageAgeOfFirstMarriageHusband from 'sections/population/marriage/prefecture-rank/RankingAverageAgeOfFirstMarriageHusband'
import { ViewsPropsType } from 'types/views'

export default async function AverageAgeOfFirstMarriageHusband({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 平均初婚年齢（夫） */}
      <PrefectureRankingCards
        Section={RankingAverageAgeOfFirstMarriageHusband}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
