import { CardProps } from 'utils/props'

import { generateSaveValuesFilePath } from './modules/filePath'
import { readValues } from './modules/readValues'
import { saveValues } from './modules/saveValues'
import { ValueType } from './types/value'

export type * from './types/value'

interface HandleValuesResult {
  filePath: string
  readValues: () => Promise<ValueType[] | null>
  saveValues: (values: ValueType[]) => Promise<{
    success: boolean
    message: string
  }>
}

const handleValue = (cardProps: CardProps): HandleValuesResult => {
  const filePath = generateSaveValuesFilePath(cardProps)

  const { fieldId, menuId, cardId } = cardProps
  const path = `${fieldId}/${menuId}/${cardId}_values.json`

  return {
    filePath,
    readValues: async () => await readValues(path),
    saveValues: async (values: ValueType[]) => saveValues(filePath, values),
  }
}

export default handleValue
