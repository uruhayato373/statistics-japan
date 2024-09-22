import { CardProps } from 'utils/props'

import saveRanking from './modules/saveRanking'
import saveValues from './modules/saveValues'
import { ValueType } from './types/value'

export type * from './types/value'

interface HandleValuesResult {
  saveValues: (
    cardProps: CardProps,
    values: ValueType[]
  ) => Promise<{
    success: boolean
    message: string
  }>
  saveRanking: (cardProps: CardProps, values: ValueType[]) => Promise<void>
}

const handleValue = (): HandleValuesResult => {
  return {
    saveValues: async (cardProps, values) => saveValues(cardProps, values),
    saveRanking: async (cardProps, values) => saveRanking(cardProps, values),
  }
}

export default handleValue
