import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import BarChartNumberOfHospitalsByBedSize from 'sections/socialsecurity/hospital/BarChartNumberOfHospitalsByBedSize'
import DashboardNumberOfHospitalBeds from 'sections/socialsecurity/hospital/DashboardNumberOfHospitalBeds'
import DashboardNumberOfHospitals from 'sections/socialsecurity/hospital/DashboardNumberOfHospitals'
import DashboardNumberOfHospitalsWithEmergencyMedicalCareSystem from 'sections/socialsecurity/hospital/DashboardNumberOfHospitalsWithEmergencyMedicalCareSystem'
import TableNumberOfDoctors from 'sections/socialsecurity/hospital/TableNumberOfDoctors'
import TableNumberOfHospitalBeds from 'sections/socialsecurity/hospital/TableNumberOfHospitalBeds'
import TableNumberOfHospitals from 'sections/socialsecurity/hospital/TableNumberOfHospitals'
import TableNumberOfHospitalsByMedicalDepartment from 'sections/socialsecurity/hospital/TableNumberOfHospitalsByMedicalDepartment'
import TableNumberOfHospitalsWithEmergencyMedicalCareSystem from 'sections/socialsecurity/hospital/TableNumberOfHospitalsWithEmergencyMedicalCareSystem'
import TableNumberOfNurses from 'sections/socialsecurity/hospital/TableNumberOfNurses'
import TableNumberOfPeopleSued from 'sections/socialsecurity/hospital/TableNumberOfPeopleSued'
import TableNumberOfPharmacists from 'sections/socialsecurity/hospital/TableNumberOfPharmacists'
import TableNursingCareHealthFacilityForTheElderly from 'sections/socialsecurity/hospital/TableNursingCareHealthFacilityForTheElderly'
import TableNursingCareMedicalFacility from 'sections/socialsecurity/hospital/TableNursingCareMedicalFacility'
import handleProps, { RouterProps } from 'utils/props'
import Error500 from 'views/maintenance/500'

interface Props {
  routerProps: RouterProps
}

export default async function PrefectureView({ routerProps }: Props) {
  try {
    const breadcrumbsProps = await handleProps(routerProps).breadcrumbsProps()
    const { currentPrefecture } = breadcrumbsProps

    return (
      <Suspense fallback={<CircularProgressViews />}>
        <Breadcrumbs custom icon breadcrumbsProps={breadcrumbsProps} />
        <Box sx={{ mt: 2.5 }}>
          <Grid container rowSpacing={4.5} columnSpacing={3}>
            {/* row 1 */}
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardNumberOfHospitals prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardNumberOfHospitalBeds prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardNumberOfHospitalsWithEmergencyMedicalCareSystem
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <BarChartNumberOfHospitalsByBedSize
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableNumberOfHospitals prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableNumberOfHospitalBeds prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableNumberOfHospitalsByMedicalDepartment
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableNumberOfHospitalsWithEmergencyMedicalCareSystem
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableNursingCareHealthFacilityForTheElderly
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableNursingCareMedicalFacility prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableNumberOfDoctors prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableNumberOfPharmacists prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableNumberOfNurses prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableNumberOfPeopleSued prefecture={currentPrefecture} />
            </Grid>
          </Grid>
        </Box>
      </Suspense>
    )
  } catch (error) {
    console.error('エラーが発生しました:', error)
    return <Error500 />
  }
}
