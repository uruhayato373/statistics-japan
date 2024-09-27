'use server'

import fs from 'fs-extra'

// object型のvalueを受け取り、filenameで指定されたjsonファイルに保存する
// データ確認のために使用する
export async function actionSaveJson(value: object, filename: string) {
  if (process.env.NODE_ENV === 'development') {
    const filePath = `local/json/${filename}`
    await fs.outputJson(filePath, value, { spaces: 2 })

    return
  }
}
