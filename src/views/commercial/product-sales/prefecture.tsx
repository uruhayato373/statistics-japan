import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import DashboardAmountOfProductOnHand from 'sections/commercial/product-sales/DashboardAmountOfProductOnHand'
import DashboardNumberOfCommercialEmployees from 'sections/commercial/product-sales/DashboardNumberOfCommercialEmployees'
import DashboardNumberOfCommercialEstablishments from 'sections/commercial/product-sales/DashboardNumberOfCommercialEstablishments'
import DashboardProductSalesAmount from 'sections/commercial/product-sales/DashboardProductSalesAmount'
import TableAmountOfProductOnHand from 'sections/commercial/product-sales/TableAmountOfProductOnHand'
import TableNumberOfCommercialEmployees from 'sections/commercial/product-sales/TableNumberOfCommercialEmployees'
import TableNumberOfCommercialEstablishments from 'sections/commercial/product-sales/TableNumberOfCommercialEstablishments'
import TableProductSalesAmount from 'sections/commercial/product-sales/TableProductSalesAmount'
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
              <DashboardProductSalesAmount prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardNumberOfCommercialEstablishments
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardNumberOfCommercialEmployees
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardAmountOfProductOnHand prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableProductSalesAmount prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableNumberOfCommercialEstablishments
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableNumberOfCommercialEmployees
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableAmountOfProductOnHand prefecture={currentPrefecture} />
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
