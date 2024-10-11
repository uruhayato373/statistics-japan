import { createClient, SupabaseClient } from '@supabase/supabase-js'

import { RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabaseの環境変数が設定されていません')
}

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)

export default async function actionSaveValues(
  routerProps: RouterProps,
  values: ValueType[]
) {
  if (process.env.NODE_ENV !== 'development') {
    return
  }

  const { fieldId, menuId, cardId } = routerProps

  if (!cardId) {
    return
  }

  try {
    // ファイル名を生成（URLをエンコードして使用）
    const fileName = `${fieldId}/${menuId}/${cardId}.json`

    // JSONをStringifyして保存
    const { data, error } = await supabase.storage
      .from('response')
      .upload(fileName, JSON.stringify(values), {
        contentType: 'application/json',
        upsert: true, // 既存ファイルを上書き
      })

    if (error) {
      console.error('ストレージへの保存エラー:', error)
      console.error('エラーの詳細:', JSON.stringify(error, null, 2))
      throw new Error(`データの保存に失敗しました: ${error.message}`)
    }

    return {
      success: true,
      message: 'データが正常に保存されました',
      path: data.path,
    }
  } catch (error) {
    console.error('データの保存に失敗しました:', error)
    if (error instanceof Error) {
      console.error('エラーメッセージ:', error.message)
      console.error('スタックトレース:', error.stack)
    }
    let errorMessage = 'データの保存に失敗しました'
    if (error instanceof Error) {
      errorMessage += `: ${error.message}`
    }
    return { success: false, message: errorMessage }
  }
}
