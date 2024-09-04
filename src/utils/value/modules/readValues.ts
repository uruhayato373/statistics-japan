import { createClient, SupabaseClient } from '@supabase/supabase-js'

import { ValueType } from '../types/value'

// Supabaseクライアントの初期化
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabaseの環境変数が設定されていません')
}

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)

export async function readValues(path: string): Promise<ValueType[] | null> {
  try {
    // Supabase Storageからファイルをダウンロード
    const { data, error } = await supabase.storage
      .from('cards') // バケット名を指定
      .download(path)

    if (error) {
      throw new Error(`ファイルのダウンロードに失敗しました: ${error.message}`)
    }

    if (!data) {
      throw new Error('ダウンロードされたデータが空です')
    }

    // ダウンロードしたデータをテキストとして読み込む
    const text = await data.text()

    // JSONとしてパース
    const values: ValueType[] = JSON.parse(text)

    return values
  } catch (error) {
    if (error instanceof Error) {
      console.error(`値の読み込みエラー: ${error.message}`)
      if (error.stack) {
        console.error('エラーのスタックトレース:', error.stack)
      }
    } else {
      console.error('予期せぬエラーが発生しました:', String(error))
    }
    return null
  }
}
