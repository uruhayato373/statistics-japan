'use server'

import path from 'path'

import fs from 'fs-extra'

import { ValueType } from 'utils/document'
import { RouterProps } from 'utils/props'

export interface SaveProps extends RouterProps {
  cardId: string
}

export async function saveValues(saveProps: SaveProps, values: ValueType[]) {
  const filePath = generateSaveFilePath(saveProps)

  try {
    // ディレクトリが存在しない場合は作成し、データを書き込み
    await fs.outputJson(filePath, values, { spaces: 2 })
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

function generateSaveFilePath(saveProps: SaveProps) {
  const { fieldId, menuId, kindId, pageId, prefCode, cardId } = saveProps
  const filePath = path.join(
    process.cwd(),
    'src',
    'data',
    'cards',
    fieldId,
    menuId
  )
  switch (kindId) {
    case 'japan':
      return path.join(filePath, 'japan', `${cardId}`, 'values.json')
    case 'prefecture':
      return path.join(
        filePath,
        'prefecture',
        `${cardId}`,
        `${prefCode}_values.json`
      )
    case 'prefecture-rank':
      return path.join(
        filePath,
        'prefecture-rank',
        `${pageId}`,
        `${cardId}_values.json`
      )
  }
}
