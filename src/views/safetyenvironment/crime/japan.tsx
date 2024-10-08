import CardsApexAxisChart from 'cards/CardsApexAxisChart'
import CardsDashboard from 'cards/CardsDashboard'
import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import AxisProstitutionOffender from 'sections/safetyenvironment/crime/chart/AxisProstitutionOffender'
import AxisSpecialLawOffender from 'sections/safetyenvironment/crime/chart/AxisSpecialLawOffender'
import AxisStimulantDrugCrackdown from 'sections/safetyenvironment/crime/chart/AxisStimulantDrugCrackdown'
import DashboardNumberOfPoliceOfficers from 'sections/safetyenvironment/crime/dashboard/DashboardNumberOfPoliceOfficers'
import TableCrimePreventionVolunteer from 'sections/safetyenvironment/crime/table/TableCrimePreventionVolunteer'
import TableIncident from 'sections/safetyenvironment/crime/table/TableIncident'
import TableNumberOfCriminalOffensesCleared from 'sections/safetyenvironment/crime/table/TableNumberOfCriminalOffensesCleared'
import TableNumberOfPeopleArrestedForCriminalLawCrimes from 'sections/safetyenvironment/crime/table/TableNumberOfPeopleArrestedForCriminalLawCrimes'
import TableNumberOfPeopleArrestedForJuvenileCriminalLawOffenses from 'sections/safetyenvironment/crime/table/TableNumberOfPeopleArrestedForJuvenileCriminalLawOffenses'
import TableNumberOfRecognizedCriminalLawOffenses from 'sections/safetyenvironment/crime/table/TableNumberOfRecognizedCriminalLawOffenses'
import TableRoadTrafficLawViolation from 'sections/safetyenvironment/crime/table/TableRoadTrafficLawViolation'
import { ViewsPropsType } from 'types/views'
import GridItem from 'views-grid/GridItem'
import MainView from 'views-grid/MainView'

// dashboard items
const dashboardItems = [{ Component: DashboardNumberOfPoliceOfficers }]

const dashboardGridProps = { xs: 12, sm: 6, md: 4, lg: 3 }

// chart items
const chartItems = [
  {
    Section: AxisProstitutionOffender,
    Card: CardsApexAxisChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 6 },
  },
  {
    Section: AxisSpecialLawOffender,
    Card: CardsApexAxisChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 6 },
  },
  {
    Section: AxisStimulantDrugCrackdown,
    Card: CardsApexAxisChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 6 },
  },
]

// table items
const tableItems = [
  {
    Section: TableCrimePreventionVolunteer,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableIncident,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableNumberOfCriminalOffensesCleared,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableNumberOfPeopleArrestedForCriminalLawCrimes,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableNumberOfPeopleArrestedForJuvenileCriminalLawOffenses,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableNumberOfRecognizedCriminalLawOffenses,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableRoadTrafficLawViolation,
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
