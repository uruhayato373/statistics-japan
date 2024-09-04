import { CardProps } from 'utils/props'

import { readValues } from './modules/readValues'
import { saveValues } from './modules/saveValues'
import { ValueType } from './types/value'

export type * from './types/value'

interface HandleValuesResult {
  readValues: () => Promise<ValueType[] | null>
  saveValues: (values: ValueType[]) => Promise<{
    success: boolean
    message: string
  }>
}

const handleValue = (cardProps: CardProps): HandleValuesResult => {
  console.log('handleValue running')
  return {
    readValues: async () => await readValues(cardProps),
    saveValues: async (values: ValueType[]) => saveValues(cardProps, values),
  }
}

export default handleValue
