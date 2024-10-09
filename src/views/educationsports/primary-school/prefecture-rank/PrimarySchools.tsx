import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingPrimarySchools from 'sections/educationsports/primary-school/prefecture-rank/RankingPrimarySchools'
import { ViewsPropsType } from 'types/views'

export default async function PrimarySchools({ routerProps }: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 小学校数 */}
      <PrefectureRankingCards
        Section={RankingPrimarySchools}
        routerProps={routerProps}
      />
    </MainView>
  )
}
