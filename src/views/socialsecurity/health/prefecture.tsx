import CardsApexAxisChart from 'cards/CardsApexAxisChart'
import CardsDashboard from 'cards/CardsDashboard'
import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import AxisNumberOfDeaths from 'sections/socialsecurity/health/chart/AxisNumberOfDeaths'
import AxisNumberOfDeathsDueToLifestyleRelatedDiseases from 'sections/socialsecurity/health/chart/AxisNumberOfDeathsDueToLifestyleRelatedDiseases'
import AxisNumberOfDeathsDueToMalignantTumors from 'sections/socialsecurity/health/chart/AxisNumberOfDeathsDueToMalignantTumors'
import DashboardFoodSelfSufficiencyRate from 'sections/socialsecurity/health/dashboard/DashboardFoodSelfSufficiencyRate'
import TableHealthyLifeExpectancy from 'sections/socialsecurity/health/table/TableHealthyLifeExpectancy'
import TableNumberOfPeopleUndergoingCancerScreening from 'sections/socialsecurity/health/table/TableNumberOfPeopleUndergoingCancerScreening'
import TableNumberOfPeopleUndergoingHealthCheckups from 'sections/socialsecurity/health/table/TableNumberOfPeopleUndergoingHealthCheckups'
import TablePregnancy from 'sections/socialsecurity/health/table/TablePregnancy'
import TableTestInspection from 'sections/socialsecurity/health/table/TableTestInspection'
import { ViewsPropsType } from 'types/views'
import GridItem from 'views-grid/GridItem'
import MainView from 'views-grid/MainView'

// dashboard items
const dashboardItems = [{ Component: DashboardFoodSelfSufficiencyRate }]

const dashboardGridProps = { xs: 12, sm: 6, md: 4, lg: 3 }

// chart items
const chartItems = [
  {
    Section: AxisNumberOfDeaths,
    Card: CardsApexAxisChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 6 },
  },
  {
    Section: AxisNumberOfDeathsDueToLifestyleRelatedDiseases,
    Card: CardsApexAxisChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 6 },
  },
  {
    Section: AxisNumberOfDeathsDueToMalignantTumors,
    Card: CardsApexAxisChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 6 },
  },
]

// table items
const tableItems = [
  {
    Section: TableHealthyLifeExpectancy,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableNumberOfPeopleUndergoingCancerScreening,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableNumberOfPeopleUndergoingHealthCheckups,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TablePregnancy,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableTestInspection,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
]

export default async function PrefectureView({ routerProps }: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* dashboard items */}
      {dashboardItems.map(({ Component }, index) => (
        <GridItem key={index} {...dashboardGridProps}>
          <Component routerProps={routerProps}>
            {(props) => <CardsDashboard {...props} />}
          </Component>
        </GridItem>
      ))}
      {/* chart items */}
      {chartItems.map(({ Section, Card, gridProps }, index) => (
        <GridItem key={`chart-${index}`} {...gridProps}>
          <Section routerProps={routerProps}>
            {(props) => <Card {...props} />}
          </Section>
        </GridItem>
      ))}
      {/* table items */}
      {tableItems.map(({ Section, Card, gridProps }, index) => (
        <GridItem key={`chart-${index}`} {...gridProps}>
          <Section routerProps={routerProps}>
            {(props) => <Card {...props} />}
          </Section>
        </GridItem>
      ))}
    </MainView>
  )
}
