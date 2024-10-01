import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import CardsDashboard from 'cards/CardsDashboard'

import { actionSavePrefecture } from 'actions/savePrefecture'
import AxisNumberOfManufacturing from 'sections/miningindustry/products/AxisNumberOfManufacturing'
import AxisProductShipmentAmount from 'sections/miningindustry/products/AxisProductShipmentAmount'
import DashboardNumberOfManufacturingEmployees from 'sections/miningindustry/products/dashboard/DashboardNumberOfManufacturingEmployees'
import DashboardNumberOfManufacturingEstablishments from 'sections/miningindustry/products/dashboard/DashboardNumberOfManufacturingEstablishments'
import DashboardProductShipmentAmount from 'sections/miningindustry/products/dashboard/DashboardProductShipmentAmount'
import PieChartProductShipmentAmountByIndustrialClassification from 'sections/miningindustry/products/PieChartProductShipmentAmountByIndustrialClassification'
import TableProductShipmentAmount from 'sections/miningindustry/products/TableProductShipmentAmount'
import handleProps, { RouterProps } from 'utils/props'
import Error500 from 'views/maintenance/500'
import GridItem from 'views-grid/GridItem'

interface Props {
  routerProps: RouterProps
}

// dashboard items
const dashboardItems = [
  { Component: DashboardProductShipmentAmount },
  { Component: DashboardNumberOfManufacturingEstablishments },
  { Component: DashboardNumberOfManufacturingEmployees },
]

const dashboardGridProps = { xs: 12, sm: 6, md: 4, lg: 3 }

// chart items
const chartItems = [
  {
    Component: AxisProductShipmentAmount,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Component: AxisNumberOfManufacturing,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Component: PieChartProductShipmentAmountByIndustrialClassification,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
]

// table items
const tableItems = [
  {
    Component: TableProductShipmentAmount,
    gridProps: { xs: 12, md: 6, lg: 8 },
  },
]

export default async function PrefectureView({ routerProps }: Props) {
  try {
    const breadcrumbsProps = await handleProps(routerProps).breadcrumbsProps()
    const { currentPrefecture } = breadcrumbsProps

    const title = breadcrumbsProps.currentMenu.menuTitle
    await actionSavePrefecture(title, routerProps)

    return (
      <Suspense fallback={<CircularProgressViews />}>
        <Breadcrumbs custom icon breadcrumbsProps={breadcrumbsProps} />
        <Box sx={{ mt: 2.5 }}>
          <Grid container rowSpacing={4.5} columnSpacing={3}>
            {/* dashboard items */}
            {dashboardItems.map(({ Component }, index) => (
              <GridItem key={index} {...dashboardGridProps}>
                <Component prefecture={currentPrefecture}>
                  {(props) => <CardsDashboard {...props} />}
                </Component>
              </GridItem>
            ))}
            {/* chart items */}
            {chartItems.map(({ Component, gridProps }, index) => (
              <GridItem key={index} {...gridProps}>
                <Component prefecture={currentPrefecture} />
              </GridItem>
            ))}
            {/* table items */}
            {tableItems.map(({ Component, gridProps }, index) => (
              <GridItem key={index} {...gridProps}>
                <Component prefecture={currentPrefecture} />
              </GridItem>
            ))}
          </Grid>
        </Box>
      </Suspense>
    )
  } catch (error) {
    console.error('エラーが発生しました:', error)
    return <Error500 />
  }
}
