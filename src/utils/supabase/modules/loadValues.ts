import { createClient, SupabaseClient } from '@supabase/supabase-js'

import { RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase環境変数が設定されていません')
}

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)

const BUCKET_NAME = 'values'
const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB

export default async function loadValues(
  routerProps: RouterProps
): Promise<ValueType[] | null> {
  const { fieldId, menuId, cardId } = routerProps

  if (!cardId) {
    console.log('cardIdが指定されていません')
    return null
  }

  try {
    const fileName = `${fieldId}/${menuId}/${cardId}.json`

    // ファイルのダウンロード
    const { data: fileData, error: fileError } = await supabase.storage
      .from(BUCKET_NAME)
      .download(fileName)

    if (fileError) {
      console.error('Supabaseエラー詳細:', fileError)
      console.error(`エラーが発生したファイル名: ${fileName}`)
      throw new Error(
        `ファイルのダウンロードに失敗しました: ${fileError.message}`
      )
    }

    if (fileData.size > MAX_FILE_SIZE) {
      console.error(`ファイルサイズ超過のファイル名: ${fileName}`)
      throw new Error(`ファイルサイズが大きすぎます: ${fileData.size} bytes`)
    }

    // Blobからテキストを読み込む
    const text = await fileData.text()

    // JSONをパース
    const values: ValueType[] = JSON.parse(text)

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
