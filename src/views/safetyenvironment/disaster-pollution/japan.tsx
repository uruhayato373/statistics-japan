import CardsDashboard from 'cards/CardsDashboard'
import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import DashboardDisasterDamageAmount from 'sections/safetyenvironment/disaster-pollution/dashboard/DashboardDisasterDamageAmount'
import DashboardNumberOfDisasterAffectedHousingUnits from 'sections/safetyenvironment/disaster-pollution/dashboard/DashboardNumberOfDisasterAffectedHousingUnits'
import DashboardNumberOfPollutionComplaints from 'sections/safetyenvironment/disaster-pollution/dashboard/DashboardNumberOfPollutionComplaints'
import TableDisasterDamageAmount from 'sections/safetyenvironment/disaster-pollution/table/TableDisasterDamageAmount'
import TableGreenhouseGasEmissions from 'sections/safetyenvironment/disaster-pollution/table/TableGreenhouseGasEmissions'
import TableNumberOfFacilitiesGeneratingSootAndSmoke from 'sections/safetyenvironment/disaster-pollution/table/TableNumberOfFacilitiesGeneratingSootAndSmoke'
import TableNumberOfPollutionComplaints from 'sections/safetyenvironment/disaster-pollution/table/TableNumberOfPollutionComplaints'
import TablePostalLifeInsurance from 'sections/safetyenvironment/disaster-pollution/table/TablePostalLifeInsurance'
import TablePrivateLifeInsurance from 'sections/safetyenvironment/disaster-pollution/table/TablePrivateLifeInsurance'
import { ViewsPropsType } from 'types/views'
import GridItem from 'views-grid/GridItem'
import MainView from 'views-grid/MainView'

// dashboard items
const dashboardItems = [
  { Component: DashboardDisasterDamageAmount },
  { Component: DashboardNumberOfPollutionComplaints },
  { Component: DashboardNumberOfDisasterAffectedHousingUnits },
]

const dashboardGridProps = { xs: 12, sm: 6, md: 4, lg: 3 }

// table items
const tableItems = [
  {
    Section: TableDisasterDamageAmount,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableGreenhouseGasEmissions,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableNumberOfFacilitiesGeneratingSootAndSmoke,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableNumberOfPollutionComplaints,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TablePostalLifeInsurance,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TablePrivateLifeInsurance,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
]

export default async function JapanView({ routerProps }: ViewsPropsType) {
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
