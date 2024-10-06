import { CardsApexAxisChartProps } from 'cards/CardsApexAxisChart'
import { CardsApexPieChartProps } from 'cards/CardsApexPieChart'
import { CardsDashboardProps } from 'cards/CardsDashboard'

import { PrefectureType } from 'utils/prefecture'
import { RouterProps } from 'utils/props'

import { CardsHighchartsPropsType, CardsPropsType } from './cards'

export interface RankingSectionsPropsType {
  routerProps?: RouterProps
  children: (
    props: CardsPropsType | CardsHighchartsPropsType
  ) => React.ReactNode
}

export interface DashboardSectionsPropsType {
  prefecture: PrefectureType
  children: (props: CardsDashboardProps) => React.ReactNode
}

export interface ApexSectionsPropsType {
  prefecture: PrefectureType
  children: (
    props: CardsApexAxisChartProps | CardsApexPieChartProps
  ) => React.ReactNode
}
