import fs from 'fs'

import { generateSaveValuesFilePath, SaveProps } from './modules/filePath'
import { ValueType } from './types/value'

export type * from './types/value'

interface HandleValuesResult {
  filePath: string
  readValues: () => ValueType[]
}

const handleValue = (saveProps: SaveProps): HandleValuesResult => {
  const filePath = generateSaveValuesFilePath(saveProps)

  const readValues = (): ValueType[] => {
    let values: ValueType[] | null = null
    try {
      const rawData = fs.readFileSync(filePath, 'utf-8')
      values = JSON.parse(rawData)
    } catch (error) {
      console.error(`ファイルの読み込みエラー: ${error}`)
    }
    return values
  }

  return {
    filePath,
    readValues,
  }
}

export default handleValue
