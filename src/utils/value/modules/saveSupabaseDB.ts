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
  // テーブルの存在確認
  const { data: tableExists, error: tableError } = await supabase
    .from('pg_tables')
    .select('tablename')
    .eq('schemaname', 'public')
    .eq('tablename', tableName)

  if (tableError) {
    console.error('テーブル存在確認エラー:', tableError)
    throw new Error(`テーブル存在確認に失敗しました: ${tableError.message}`)
  }

  if (!tableExists || tableExists.length === 0) {
    console.log(`テーブル ${tableName} は存在しません`)
    return null
  }

  // 列情報の取得（カスタム関数を使用）
  const { data: columns, error: columnError } = await supabase.rpc(
    'get_table_columns',
    { table_name: tableName }
  )

  if (columnError) {
    console.error('列情報取得エラー:', columnError)
    throw new Error(`列情報の取得に失敗しました: ${columnError.message}`)
  }

  console.log(`テーブル ${tableName} の構造:`, columns)
  return columns
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

    const tableStructure = await checkTableStructure(tableName)
    if (!tableStructure) {
      throw new Error(`テーブル ${tableName} が存在しません`)
    }

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
