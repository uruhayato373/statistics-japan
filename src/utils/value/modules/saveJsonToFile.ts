import fs from 'fs-extra'

import { ValueType } from '../types/value'

export default async function saveJsonToFile(
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
