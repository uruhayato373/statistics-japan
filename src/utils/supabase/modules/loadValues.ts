import { createClient, SupabaseClient } from '@supabase/supabase-js'

import { RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)

export default async function loadValues(
  routerProps: RouterProps,
  prefCode: string
): Promise<ValueType[] | null> {
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  const { fieldId, menuId, cardId } = routerProps

  if (!cardId) {
    return null
  }

  try {
    // ファイル名を生成（URLをエンコードして使用）
    const fileName = `${fieldId}/${menuId}/${cardId}.json`

    // ファイルをダウンロード
    const { data, error } = await supabase.storage
      .from('response')
      .download(fileName)

    if (error) {
      throw new Error(`データの読み込みに失敗しました: ${error.message}`)
    }

    // ダウンロードしたデータをテキストとして読み込み
    const text = await data.text()

    // JSONをパース
    const values: ValueType[] = JSON.parse(text)

    return values.filter((f) => f.areaCode === prefCode)
  } catch (error) {
    console.error('データの読み込みに失敗しました:', error)
    return null
  }
}
