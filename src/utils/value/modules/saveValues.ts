import path from 'path'

import { CardProps } from 'utils/props'

import { ValueType } from '../types/value'

import saveJsonToFile from './saveJsonToFile'

function getUniqueAreaCodes(values: ValueType[]): string[] {
  return Array.from(new Set(values.map((value) => value.areaCode)))
}

export default async function saveValues(
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

export function generateLocalFileName(cardProps: CardProps, areaCode?: string) {
  const { fieldId, menuId, cardId } = cardProps
  const filename = areaCode ? `${cardId}_${areaCode}.json` : `${cardId}.json`
  const filePath = path.join(
    process.cwd(),
    'local',
    'cards',
    fieldId,
    menuId,
    filename
  )

  return filePath
}
