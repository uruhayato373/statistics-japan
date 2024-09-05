import { createClient, SupabaseClient } from '@supabase/supabase-js'

import { CardProps } from 'utils/props'

import { ValueType } from '../types/value'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabaseの環境変数が設定されていません')
}

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)

async function checkTableStructure(tableName: string) {
  const { data, error } = await supabase
    .from('information_schema.columns')
    .select('column_name, data_type')
    .eq('table_schema', 'public')
    .eq('table_name', tableName)

  if (error) {
    console.error('テーブル構造の確認に失敗しました:', error)
    throw new Error(`テーブル構造の確認に失敗しました: ${error.message}`)
  }

  console.log(`テーブル ${tableName} の構造:`, data)
  return data
}

export default async function saveSupabaseDB(
  cardProps: CardProps,
  values: ValueType[]
) {
  const { fieldId, menuId, cardId } = cardProps

  try {
    const tableName = `${fieldId}`

    console.log(`テーブル ${tableName} の作成を試みます`)
    const { error: createTableError } = await supabase.rpc(
      'create_values_table_if_not_exists',
      { table_name: tableName }
    )

    if (createTableError) {
      console.error('テーブル作成エラー:', createTableError)
      throw new Error(
        `テーブルの作成に失敗しました: ${createTableError.message}`
      )
    }

    await checkTableStructure(tableName)

    const extendedValues = values.map((value) => ({
      ...value,
      menuId,
      cardId,
    }))

    console.log('保存するデータ:', extendedValues[0]) // 最初の要素のみログ出力

    const { data: upsertData, error: upsertError } = await supabase
      .from(tableName)
      .upsert(extendedValues, {
        onConflict: 'menuId, cardId, timeCode, areaCode, categoryCode',
        ignoreDuplicates: false,
      })

    if (upsertError) {
      console.error('Upsertエラー:', upsertError)
      throw new Error(`データの保存に失敗しました: ${upsertError.message}`)
    }

    console.log('Upsertの結果:', upsertData)

    return { success: true, message: 'データが正常に保存されました' }
  } catch (error) {
    console.error('データの保存に失敗しました:', error)
    let errorMessage = 'データの保存に失敗しました'
    if (error instanceof Error) {
      errorMessage += `: ${error.message}`
      console.error('エラースタック:', error.stack)
    }
    return { success: false, message: errorMessage }
  }
}
