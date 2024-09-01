import fs from 'fs-extra'

import { ValueType } from '../types/value'

export async function saveValues(filePath: string, values: ValueType[]) {
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
