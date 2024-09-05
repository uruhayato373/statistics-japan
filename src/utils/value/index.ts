import { CardProps } from 'utils/props'

import { readValues } from './modules/readValues'
import { saveValues } from './modules/saveValues'
import { ValueType } from './types/value'

export type * from './types/value'

interface HandleValuesResult {
  readValues: (
    cardProps: CardProps,
    areaCode?: string
  ) => Promise<ValueType[] | null>
  saveValues: (
    cardProps: CardProps,
    values: ValueType[]
  ) => Promise<{
    success: boolean
    message: string
  }>
}

const handleValue = (): HandleValuesResult => {
  return {
    readValues: async (cardProps, areaCode) =>
      await readValues(cardProps, areaCode),
    saveValues: async (cardProps, values) => saveValues(cardProps, values),
  }
}

export default handleValue
