import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingHighSchools from 'sections/educationsports/high-school/prefecture-rank/RankingHighSchools'

import { ViewsPropsType } from 'types/views'

export default async function HighSchools({ routerProps }: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 高等学校数 */}
      <PrefectureRankingCards
        Section={RankingHighSchools}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
