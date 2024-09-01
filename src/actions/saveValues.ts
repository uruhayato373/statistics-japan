'use server'

import fs from 'fs-extra'

import { SaveProps } from 'utils/props'
import handleValue, { ValueType } from 'utils/value'

export async function saveValues(saveProps: SaveProps, values: ValueType[]) {
  const { filePath } = handleValue(saveProps)

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
