import { CardsApexAxisChartProps } from 'cards/CardsApexAxisChart'
import { CardsApexPieChartProps } from 'cards/CardsApexPieChart'
import { CardsDashboardProps } from 'cards/CardsDashboard'
import { CardsReactTimeTableProps } from 'cards/CardsReactTimeTable'

import { RouterProps } from 'utils/props'

import { CardsHighchartsPropsType, CardsPropsType } from './cards'

type AllCardPropsType =
  | CardsPropsType
  | CardsHighchartsPropsType
  | CardsDashboardProps
  | CardsApexAxisChartProps
  | CardsApexPieChartProps
  | CardsReactTimeTableProps

export interface SectionsPropsType {
  routerProps?: RouterProps
  children: (props: AllCardPropsType) => React.ReactNode
}
