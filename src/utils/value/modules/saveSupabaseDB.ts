import { createClient, SupabaseClient } from '@supabase/supabase-js'

import { CardProps } from 'utils/props'

import { ValueType } from '../types/value'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabaseの環境変数が設定されていません')
}

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)

export default async function saveSupabaseDB(
  cardProps: CardProps,
  values: ValueType[]
) {
  const { fieldId, menuId, cardId } = cardProps

  try {
    const tableName = `${fieldId}`

    console.log(`テーブル ${tableName} にデータを更新します`)

    const extendedValues = values.map((value) => ({
      ...value,
      menuId,
      cardId,
    }))

    console.log('更新するデータ:', extendedValues[0]) // 最初の要素のみログ出力

    // テーブル構造の確認
    const { data: columns, error: columnError } = await supabase
      .from(tableName)
      .select()
      .limit(0)

    if (columnError) {
      console.error('テーブル構造の確認エラー:', columnError)
      throw new Error(
        `テーブル構造の確認に失敗しました: ${columnError.message}`
      )
    }

    console.log('テーブル構造:', Object.keys(columns[0] || {}))

    const { data: upsertData, error: upsertError } = await supabase
      .from(tableName)
      .upsert(extendedValues, {
        onConflict: 'menuId, cardId, timeCode, areaCode, categoryCode',
        ignoreDuplicates: false,
      })

    if (upsertError) {
      console.error('Upsertエラー:', upsertError)
      throw new Error(`データの更新に失敗しました: ${upsertError.message}`)
    }

    console.log('Upsertの結果:', upsertData)

    return { success: true, message: 'データが正常に更新されました' }
  } catch (error) {
    console.error('データの更新に失敗しました:', error)
    let errorMessage = 'データの更新に失敗しました'
    if (error instanceof Error) {
      errorMessage += `: ${error.message}`
      console.error('エラースタック:', error.stack)
    }
    return { success: false, message: errorMessage }
  }
}
