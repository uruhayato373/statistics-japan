import { RouterProps } from 'utils/props'

import { CardsHighchartsPropsType, CardsPropsType } from './cards'

export interface RankingSectionsPropsType {
  routerProps?: RouterProps
  children: (
    props: CardsPropsType | CardsHighchartsPropsType
  ) => React.ReactNode
}
