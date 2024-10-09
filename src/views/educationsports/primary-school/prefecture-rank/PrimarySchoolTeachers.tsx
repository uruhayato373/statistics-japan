import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingPrimarySchoolTeachers from 'sections/educationsports/primary-school/prefecture-rank/RankingPrimarySchoolTeachers'
import { ViewsPropsType } from 'types/views'

export default async function PrimarySchoolTeachers({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 小学教員数 */}
      <PrefectureRankingCards
        Section={RankingPrimarySchoolTeachers}
        routerProps={routerProps}
      />
    </MainView>
  )
}
