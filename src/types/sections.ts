import { RouterProps } from 'utils/props'

import { CardsPropsType } from './cards'

export interface SectionsPropsType {
  routerProps?: RouterProps
  children: (props: CardsPropsType) => React.ReactNode
}
