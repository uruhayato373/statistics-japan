import RankingAverageAgeOfFirstMarriageHusband from 'sections/population/marriage/prefecture-rank/RankingAverageAgeOfFirstMarriageHusband'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function AverageAgeOfFirstMarriageHusband({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 平均初婚年齢（夫） */}
      <PrefectureRankingCards
        Section={RankingAverageAgeOfFirstMarriageHusband}
        routerProps={routerProps}
      />
    </MainView>
  )
}
