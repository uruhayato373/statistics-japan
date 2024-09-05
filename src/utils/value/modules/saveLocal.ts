import fs from 'fs-extra'

import { CardProps } from 'utils/props'

import { ValueType } from '../types/value'

import { generateLocalFileName } from './generateLocalFileName'

async function saveJsonToFile(
  filename: string,
  values: ValueType[]
): Promise<{ success: boolean; message: string }> {
  try {
    await fs.outputJson(filename, values, { spaces: 2 })
    return { success: true, message: 'データが正常に保存されました' }
  } catch (error) {
    console.error('データの保存に失敗しました:', error)
    const errorMessage =
      error instanceof Error
        ? `データの保存に失敗しました: ${error.message}`
        : 'データの保存に失敗しました'
    return { success: false, message: errorMessage }
  }
}

function getUniqueAreaCodes(values: ValueType[]): string[] {
  return Array.from(new Set(values.map((value) => value.areaCode)))
}

export default async function saveLocalJson(
  cardProps: CardProps,
  values: ValueType[]
): Promise<{ success: boolean; message: string }> {
  switch (cardProps.kindId) {
    case 'prefecture-rank': {
      const filename = generateLocalFileName(cardProps)
      return saveJsonToFile(filename, values)
    }
    default: {
      const areaCodes = getUniqueAreaCodes(values)
      const results = await Promise.all(
        areaCodes.map(async (areaCode) => {
          const filename = generateLocalFileName(cardProps, areaCode)
          const valuesFiltered = values.filter(
            (value) => value.areaCode === areaCode
          )
          return saveJsonToFile(filename, valuesFiltered)
        })
      )

      const allSuccessful = results.every((result) => result.success)
      if (allSuccessful) {
        return {
          success: true,
          message: 'すべてのデータが正常に保存されました',
        }
      } else {
        const failedCount = results.filter((result) => !result.success).length
        return {
          success: false,
          message: `${failedCount}件のデータの保存に失敗しました`,
        }
      }
    }
  }
}
