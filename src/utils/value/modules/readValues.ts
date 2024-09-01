import fs from 'fs'

import { ValueType } from '../types/value'

export function readValues(filePath: string) {
  let values: ValueType[] | null = null
  try {
    const rawData = fs.readFileSync(filePath, 'utf-8')
    values = JSON.parse(rawData)
  } catch (error) {
    console.error(`ファイルの読み込みエラー: ${error}`)
  }
  return values
}
