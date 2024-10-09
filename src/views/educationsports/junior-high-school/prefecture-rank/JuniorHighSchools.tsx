import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingJuniorHighSchools from 'sections/educationsports/junior-high-school/prefecture-rank/RankingJuniorHighSchools'
import { ViewsPropsType } from 'types/views'

export default async function JuniorHighSchools({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 中学校数 */}
      <PrefectureRankingCards
        Section={RankingJuniorHighSchools}
        routerProps={routerProps}
      />
    </MainView>
  )
}
