import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingAdministrativeDepartmentEmployees from 'sections/administrativefinancial/staff/prefecture-rank/RankingAdministrativeDepartmentEmployees'

import { RouterPropsType } from 'types/apps'

interface Props {
  routerProps: RouterPropsType
}

export default async function PrefectureRankView({ routerProps }: Props) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 一般行政部門職員数 */}
      <PrefectureRankingCards
        Section={RankingAdministrativeDepartmentEmployees}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
