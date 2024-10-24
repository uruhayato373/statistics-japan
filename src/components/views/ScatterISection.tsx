import { Typography } from '@mui/material'

import GridItem from 'components/views/GridItem'

import CardsHighchartsScatterChart from 'cards/CardsHighchartsScatterChart'

import { Options } from 'highcharts'

import { CardsPropsType } from 'types/cards'
import { ViewsPropsType } from 'types/views'

interface ScatterChartsSectionProps {
  charts: React.ComponentType<{
    routerProps: ViewsPropsType['routerProps']
    children: (props: CardsPropsType<Options>) => React.ReactNode
  }>[]
  routerProps: ViewsPropsType['routerProps']
  title?: string
}

const ScatterChartsSection: React.FC<ScatterChartsSectionProps> = ({
  charts,
  routerProps,
  title = '相関関係',
}) => {
  return (
    <>
      <GridItem xs={12}>
        <Typography variant="h4">{title}</Typography>
      </GridItem>
      {charts.map((ScatterChart, index) => (
        <GridItem key={`scatter-${index}`} xs={12} md={6} lg={4}>
          <ScatterChart routerProps={routerProps}>
            {(props) => <CardsHighchartsScatterChart {...props} />}
          </ScatterChart>
        </GridItem>
      ))}
    </>
  )
}

export default ScatterChartsSection
