import ViewsWrapper from 'components/views//ViewsWrapper'
import ChartItems from 'components/views/ChartItems'
import DashboardItems from 'components/views/DashboardItems'
import TableItems from 'components/views/TableItems'

import CardsApexBarChart from 'cards/CardsApexBarChart'
import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import BarNumberOfHospitalsByBedSize from 'sections/socialsecurity/hospital/chart/BarNumberOfHospitalsByBedSize'
import DashboardNumberOfHospitalBeds from 'sections/socialsecurity/hospital/dashboard/DashboardNumberOfHospitalBeds'
import DashboardNumberOfHospitals from 'sections/socialsecurity/hospital/dashboard/DashboardNumberOfHospitals'
import DashboardNumberOfHospitalsWithEmergencyMedicalCareSystem from 'sections/socialsecurity/hospital/dashboard/DashboardNumberOfHospitalsWithEmergencyMedicalCareSystem'
import TableNumberOfDoctors from 'sections/socialsecurity/hospital/table/TableNumberOfDoctors'
import TableNumberOfHospitalBeds from 'sections/socialsecurity/hospital/table/TableNumberOfHospitalBeds'
import TableNumberOfHospitals from 'sections/socialsecurity/hospital/table/TableNumberOfHospitals'
import TableNumberOfHospitalsByMedicalDepartment from 'sections/socialsecurity/hospital/table/TableNumberOfHospitalsByMedicalDepartment'
import TableNumberOfHospitalsWithEmergencyMedicalCareSystem from 'sections/socialsecurity/hospital/table/TableNumberOfHospitalsWithEmergencyMedicalCareSystem'
import TableNumberOfNurses from 'sections/socialsecurity/hospital/table/TableNumberOfNurses'
import TableNumberOfPeopleSued from 'sections/socialsecurity/hospital/table/TableNumberOfPeopleSued'
import TableNumberOfPharmacists from 'sections/socialsecurity/hospital/table/TableNumberOfPharmacists'
import TableNursingCareHealthFacilityForTheElderly from 'sections/socialsecurity/hospital/table/TableNursingCareHealthFacilityForTheElderly'
import TableNursingCareMedicalFacility from 'sections/socialsecurity/hospital/table/TableNursingCareMedicalFacility'
import { ViewsPropsType } from 'types/views'

// dashboard items
const dashboardItems = [
  { Component: DashboardNumberOfHospitals },
  { Component: DashboardNumberOfHospitalBeds },
  { Component: DashboardNumberOfHospitalsWithEmergencyMedicalCareSystem },
]

// chart items
const chartItems = [
  {
    Section: BarNumberOfHospitalsByBedSize,
    Card: CardsApexBarChart,
    gridProps: { xs: 12, sm: 6, md: 6, lg: 6 },
  },
]

// table items
const tableItems = [
  {
    Section: TableNumberOfDoctors,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableNumberOfHospitalBeds,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableNumberOfHospitals,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableNumberOfHospitalsByMedicalDepartment,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableNumberOfHospitalsWithEmergencyMedicalCareSystem,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableNumberOfNurses,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableNumberOfPeopleSued,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableNumberOfPharmacists,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableNursingCareHealthFacilityForTheElderly,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: TableNursingCareMedicalFacility,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
]

export default async function PrefectureView({ routerProps }: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      <DashboardItems routerProps={routerProps} items={dashboardItems} />
      <ChartItems routerProps={routerProps} items={chartItems} />
      <TableItems routerProps={routerProps} items={tableItems} />
    </ViewsWrapper>
  )
}
