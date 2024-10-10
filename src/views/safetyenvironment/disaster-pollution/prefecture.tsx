import ViewsWrapper from 'components/views//ViewsWrapper'
import DashboardItems from 'components/views/DashboardItems'
import TableItems from 'components/views/TableItems'

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

// dashboard items
const dashboardItems = [
  { Component: DashboardDisasterDamageAmount },
  { Component: DashboardNumberOfPollutionComplaints },
  { Component: DashboardNumberOfDisasterAffectedHousingUnits },
]

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

export default async function PrefectureView({ routerProps }: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      <DashboardItems routerProps={routerProps} items={dashboardItems} />
      <TableItems routerProps={routerProps} items={tableItems} />
    </ViewsWrapper>
  )
}
