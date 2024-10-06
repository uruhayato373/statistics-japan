import RankingAdministrativeDepartmentEmployees from 'sections/administrativefinancial/staff/prefecture-rank/RankingAdministrativeDepartmentEmployees'
import { RouterProps } from 'utils/props'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

interface Props {
  routerProps: RouterProps
}

export default async function PrefectureRankView({ routerProps }: Props) {
  return (
    <MainView routerProps={routerProps}>
      {/* 一般行政部門職員数 */}
      <PrefectureRankingCards
        Section={RankingAdministrativeDepartmentEmployees}
        routerProps={routerProps}
      />
    </MainView>
  )
}
