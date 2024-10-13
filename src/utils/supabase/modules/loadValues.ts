import { createClient, SupabaseClient } from '@supabase/supabase-js'

import { actionSaveJson } from 'actions/saveJson'
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
    console.log(`ファイル名: ${fileName}`)

    // ファイルのダウンロード
    const { data: fileData, error: fileError } = await supabase.storage
      .from(BUCKET_NAME)
      .download(fileName)

    if (fileError) {
      console.error('Supabaseエラー詳細:', fileError)
      throw new Error(
        `ファイルのダウンロードに失敗しました: ${fileError.message}`
      )
    }

    if (!fileData) {
      console.log('ダウンロードしたデータが空です')
      return null
    }

    console.log(`ファイルサイズ: ${fileData.size} bytes`)

    if (fileData.size > MAX_FILE_SIZE) {
      throw new Error(`ファイルサイズが大きすぎます: ${fileData.size} bytes`)
    }

    // Blobからテキストを読み込む
    const text = await fileData.text()
    console.log('ファイルの内容:', text.substring(0, 100) + '...') // 最初の100文字のみログ出力

    // JSONをパース
    const values: ValueType[] = JSON.parse(text)

    // 読み込んだデータを保存（デバッグ用）
    await actionSaveJson(values, `${routerProps.cardId}_loadValues.json`)

    console.log(`${values.length}個の値を正常に読み込みました`)
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
