import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import DashboardJuniorHighSchools from 'sections/educationsports/junior-high-school/DashboardJuniorHighSchools'
import DashboardJuniorHighSchoolStudents from 'sections/educationsports/junior-high-school/DashboardJuniorHighSchoolStudents'
import DashboardJuniorHighSchoolTeachers from 'sections/educationsports/junior-high-school/DashboardJuniorHighSchoolTeachers'
import TableJuniorHighSchool from 'sections/educationsports/junior-high-school/TableJuniorHighSchool'
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
              <DashboardJuniorHighSchools prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardJuniorHighSchoolStudents
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardJuniorHighSchoolTeachers
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={5} lg={7}>
              <TableJuniorHighSchool prefecture={currentPrefecture} />
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
