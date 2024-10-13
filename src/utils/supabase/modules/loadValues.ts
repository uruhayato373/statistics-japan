import { createClient, SupabaseClient } from '@supabase/supabase-js'

import { actionSaveJson } from 'actions/saveJson'
import { RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)

const BUCKET_NAME = 'values'
const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB

export default async function loadValues(
  routerProps: RouterProps
): Promise<ValueType[] | null> {
  const { fieldId, menuId, cardId } = routerProps

  if (!cardId) {
    return null
  }

  try {
    const fileName = `${fieldId}/${menuId}/${cardId}.json`

    // ファイルのメタデータを取得
    const { data: fileData, error: fileError } = await supabase.storage
      .from(BUCKET_NAME)
      .download(fileName)

    if (fileError) {
      throw new Error(
        `ファイルのダウンロードに失敗しました: ${fileError.message}`
      )
    }

    if (!fileData) {
      throw new Error('ダウンロードしたデータが空です')
    }

    if (fileData.size > MAX_FILE_SIZE) {
      throw new Error(`ファイルサイズが大きすぎます: ${fileData.size} bytes`)
    }

    // Blobからテキストを読み込む
    const text = await fileData.text()

    // JSONをパース
    const values: ValueType[] = JSON.parse(text)

    // 読み込んだデータを保存（デバッグ用）
    await actionSaveJson(values, `${routerProps.cardId}_loadValues.json`)

    return values
  } catch (error) {
    console.error('データの読み込みに失敗しました:', error)
    if (error instanceof Error) {
      console.error('エラーメッセージ:', error.message)
      console.error('スタックトレース:', error.stack)
    }
    return null
  }
}
