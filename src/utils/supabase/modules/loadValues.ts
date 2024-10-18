import { SupabaseClient } from '@supabase/supabase-js'

import { RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

const BUCKET_NAME = 'values'

export default async function loadValues(
  supabase: SupabaseClient,
  routerProps: RouterProps
): Promise<ValueType[] | null> {
  const { fieldId, menuId, cardId } = routerProps
  const fileName = `${fieldId}/${menuId}/${cardId}.json`

  if (!cardId) {
    console.error(`cardIdが指定されていません。ファイル名: ${fileName}`)
    return null
  }

  try {
    // ファイルの存在確認
    const { data: fileExists, error: existsError } = await supabase.storage
      .from(BUCKET_NAME)
      .list(fileName.split('/').slice(0, -1).join('/'))

    if (existsError) {
      console.error('ファイルの存在確認に失敗しました:', existsError)
      throw new Error(
        `ファイルの存在確認に失敗しました: ${existsError.message}`
      )
    }

    if (!fileExists.some((file) => file.name === fileName.split('/').pop())) {
      console.error(`ファイルが存在しません: ${fileName}`)
      return null
    }

    // ファイルのダウンロード
    const { data: fileData, error: fileError } = await supabase.storage
      .from(BUCKET_NAME)
      .download(fileName)

    if (fileError) {
      console.error('Supabaseエラー詳細:', fileError)
      console.error(`エラーが発生したファイル名: ${fileName}`)
      throw new Error(
        `ファイルのダウンロードに失敗しました: ${fileError.message || JSON.stringify(fileError)}`
      )
    }

    if (!fileData) {
      console.error('ダウンロードされたデータが空です')
      return null
    }

    // Blobからテキストを読み込む
    const text = await fileData.text()
    console.log(`ダウンロードされたデータの長さ: ${text.length} バイト`)

    // JSONをパース
    const values: ValueType[] = JSON.parse(text)
    console.log(`パースされたデータの項目数: ${values.length}`)

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
