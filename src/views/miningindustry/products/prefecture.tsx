import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import CircularProgressViews from 'components/progress/CircularProgressViews'

import CardsApexAxisChart from 'cards/CardsApexAxisChart'
import CardsApexPieChart from 'cards/CardsApexPieChart'
import CardsDashboard from 'cards/CardsDashboard'
import CardsHighchartsAxisChart from 'cards/CardsHighchartsAxisChart'
import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import AxisNumberOfManufacturing from 'sections/miningindustry/products/chart/AxisNumberOfManufacturing'
import AxisProductShipmentAmount from 'sections/miningindustry/products/chart/AxisProductShipmentAmount'
import PieProductShipmentAmountByIndustrialClassification from 'sections/miningindustry/products/chart/PieProductShipmentAmountByIndustrialClassification'
import DashboardNumberOfManufacturingEmployees from 'sections/miningindustry/products/dashboard/DashboardNumberOfManufacturingEmployees'
import DashboardNumberOfManufacturingEstablishments from 'sections/miningindustry/products/dashboard/DashboardNumberOfManufacturingEstablishments'
import DashboardProductShipmentAmount from 'sections/miningindustry/products/dashboard/DashboardProductShipmentAmount'
import TableProductShipmentAmount from 'sections/miningindustry/products/table/TableProductShipmentAmount'
import { handlePrefecture } from 'utils/prefecture'
import { RouterProps } from 'utils/props'
import GridItem from 'views-grid/GridItem'
import ViewsHeader from 'views-grid/ViewsHeader'

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
  const currentPrefecture = handlePrefecture().findItem(routerProps.prefCode)

  return (
    <Suspense fallback={<CircularProgressViews />}>
      <ViewsHeader routerProps={routerProps} />
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
}
