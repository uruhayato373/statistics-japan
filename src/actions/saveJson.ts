'use server'

import { promises as fs } from 'fs'
import path from 'path'

interface SaveJsonResult {
  success: boolean
  message: string
}

export async function actionSaveJson(
  value: object,
  filename: string
): Promise<SaveJsonResult> {
  if (process.env.NODE_ENV !== 'development') {
    return {
      success: false,
      message: 'This action is only available in development mode.',
    }
  }

  try {
    const dirPath = path.join(process.cwd(), 'local', 'json')
    const filePath = path.join(dirPath, filename)

    // ディレクトリが存在しない場合は作成
    await fs.mkdir(dirPath, { recursive: true })

    // JSONファイルを保存
    await fs.writeFile(filePath, JSON.stringify(value, null, 2))

    return {
      success: true,
      message: `File successfully saved: ${filePath}`,
    }
  } catch (error) {
    console.error('Error saving JSON file:', error)
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
    }
  }
}
