import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'
import SelectPrefecture from 'components/SelectPrefecture'

import CardsApexAxisChart from 'cards/CardsApexAxisChart'
import CardsApexPieChart from 'cards/CardsApexPieChart'
import CardsDashboard from 'cards/CardsDashboard'
import CardsHighchartsAxisChart from 'cards/CardsHighchartsAxisChart'
import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import { actionSavePrefecture } from 'actions/savePrefecture'
import AxisNumberOfManufacturing from 'sections/miningindustry/products/AxisNumberOfManufacturing'
import AxisProductShipmentAmount from 'sections/miningindustry/products/AxisProductShipmentAmount'
import DashboardNumberOfManufacturingEmployees from 'sections/miningindustry/products/dashboard/DashboardNumberOfManufacturingEmployees'
import DashboardNumberOfManufacturingEstablishments from 'sections/miningindustry/products/dashboard/DashboardNumberOfManufacturingEstablishments'
import DashboardProductShipmentAmount from 'sections/miningindustry/products/dashboard/DashboardProductShipmentAmount'
import PieProductShipmentAmountByIndustrialClassification from 'sections/miningindustry/products/PieProductShipmentAmountByIndustrialClassification'
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
    Section: AxisProductShipmentAmount,
    Card: CardsHighchartsAxisChart,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: AxisNumberOfManufacturing,
    Card: CardsApexAxisChart,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
  {
    Section: PieProductShipmentAmountByIndustrialClassification,
    Card: CardsApexPieChart,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
]

// table items
const tableItems = [
  {
    Section: TableProductShipmentAmount,
    Card: CardsReactTimeTable,
    gridProps: { xs: 12, md: 6, lg: 6 },
  },
]

export default async function PrefectureView({ routerProps }: Props) {
  try {
    const breadcrumbsProps = await handleProps(routerProps).breadcrumbsProps()
    const { currentPrefecture } = breadcrumbsProps

    const title = breadcrumbsProps.pageTitle
    await actionSavePrefecture(title, routerProps)

    return (
      <Suspense fallback={<CircularProgressViews />}>
        <Breadcrumbs custom icon breadcrumbsProps={breadcrumbsProps} />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 1, mb: 2.5 }}
        >
          <Typography variant="h2">{title}</Typography>
          <SelectPrefecture />
        </Stack>
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
            {chartItems.map(({ Section, Card, gridProps }, index) => (
              <GridItem key={`chart-${index}`} {...gridProps}>
                <Section prefecture={currentPrefecture}>
                  {(props) => <Card {...props} />}
                </Section>
              </GridItem>
            ))}
            {/* table items */}
            {tableItems.map(({ Section, Card, gridProps }, index) => (
              <GridItem key={`chart-${index}`} {...gridProps}>
                <Section prefecture={currentPrefecture}>
                  {(props) => <Card {...props} />}
                </Section>
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
