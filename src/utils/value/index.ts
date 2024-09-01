import { CardProps } from 'utils/props'

import { generateSaveValuesFilePath } from './modules/filePath'
import { readValues } from './modules/readValues'
import { saveValues } from './modules/saveValues'
import { ValueType } from './types/value'

export type * from './types/value'

interface HandleValuesResult {
  filePath: string
  readValues: () => ValueType[]
  saveValues: (values: ValueType[]) => Promise<{
    success: boolean
    message: string
  }>
}

const handleValue = (cardProps: CardProps): HandleValuesResult => {
  const filePath = generateSaveValuesFilePath(cardProps)

  return {
    filePath,
    readValues: () => readValues(filePath),
    saveValues: async (values: ValueType[]) => saveValues(filePath, values),
  }
}

export default handleValue
