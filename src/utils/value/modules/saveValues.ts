import fs from 'fs-extra'

import { CardProps } from 'utils/props'

import { ValueType } from '../types/value'

import { generateLocalFileName } from './generateLocalFileName'

export async function saveValues(cardProps: CardProps, values: ValueType[]) {
  const filename = generateLocalFileName(cardProps)
  const areaCodes = getUniqueAreaCodes(values)
  console.log(areaCodes)
  try {
    // ディレクトリが存在しない場合は作成し、データを書き込み
    await fs.outputJson(filename, values, { spaces: 2 })
    return { success: true, message: 'データが正常に保存されました' }
  } catch (error) {
    console.error('データの保存に失敗しました:', error)
    let errorMessage = 'データの保存に失敗しました'
    if (error instanceof Error) {
      errorMessage += `: ${error.message}`
    }
    return { success: false, message: errorMessage }
  }
}

function getUniqueAreaCodes(values: ValueType[]): string[] {
  const uniqueAreaCodesSet = new Set<string>(
    values.map((value) => value.areaCode)
  )

  return Array.from(uniqueAreaCodesSet)
}
