import fs from 'fs'

import { ValueType } from 'utils/document'

import { generateSaveValuesFilePath, SaveProps } from './modules/filePath'

interface HandleValuesResult {
  filePath: string
  readValues: () => ValueType[]
}

const handleValues = (saveProps: SaveProps): HandleValuesResult => {
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

export default handleValues
