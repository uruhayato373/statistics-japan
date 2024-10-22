import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'
import ScatterChartsSection from 'components/views/ScatterISection'

import RankingAverageAgeOfFirstMarriageHusband from 'sections/population/marriage/prefecture-rank/RankingAverageAgeOfFirstMarriageHusband'
import RankingAverageAgeOfFirstMarriageWife from 'sections/population/marriage/prefecture-rank/RankingAverageAgeOfFirstMarriageWife'
import ScatterFirstMarriageHusbandNumberOfMarriage from 'sections/population/marriage/scatter/ScatterFirstMarriageHusbandNumberOfMarriage'
import ScatterFirstMarriageWifeNumberOfMarriage from 'sections/population/marriage/scatter/ScatterFirstMarriageWifeNumberOfMarriage'
import { ViewsPropsType } from 'types/views'

const SCATTER_CHARTS = [
  ScatterFirstMarriageHusbandNumberOfMarriage,
  ScatterFirstMarriageWifeNumberOfMarriage,
]

export default async function AverageAgeOfFirstMarriage({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 平均初婚年齢（夫） */}
      <PrefectureRankingCards
        Section={RankingAverageAgeOfFirstMarriageHusband}
        routerProps={routerProps}
      />
      {/* 平均初婚年齢（妻） */}
      <PrefectureRankingCards
        Section={RankingAverageAgeOfFirstMarriageWife}
        routerProps={routerProps}
      />
      {/* 相関関係 */}
      <ScatterChartsSection charts={SCATTER_CHARTS} routerProps={routerProps} />
    </ViewsWrapper>
  )
}
