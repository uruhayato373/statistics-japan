import { createClient, SupabaseClient } from '@supabase/supabase-js'

import { CardProps } from 'utils/props'

import { ValueType } from '../types/value'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey)
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

async function logTableStructure(tableName: string) {
  const { data, error } = await supabase
    .from('information_schema.columns')
    .select('column_name, data_type')
    .eq('table_name', tableName)

  if (error) {
    console.error('テーブル構造の取得に失敗しました:', error)
  } else {
    console.log('テーブル構造:', data)
  }
}

async function insertOrUpdateData(
  tableName: string,
  values: ValueType[]
): Promise<ValueType[] | null> {
  console.log('挿入/更新するデータ:', values[0])

  const { data, error } = await supabaseAdmin.from(tableName).upsert(values, {
    onConflict: 'timeCode, areaCode, categoryCode',
    ignoreDuplicates: false,
    count: 'exact',
  })

  if (error) {
    console.error('データ更新エラーの詳細:', error)
    throw new Error(`データの保存に失敗しました: ${error.message}`)
  }

  console.log('更新されたデータ:', data)
  return data
}

export async function saveSupabaseDB(
  cardProps: CardProps,
  values: ValueType[]
) {
  const tableName = `values_${cardProps.fieldId}`

  try {
    await logTableStructure(tableName)

    const updatedData = await insertOrUpdateData(tableName, values)

    if (updatedData && updatedData.length > 0) {
      return {
        success: true,
        message: `${updatedData.length}件のデータが正常に保存されました`,
      }
    } else {
      return { success: false, message: 'データは更新されませんでした' }
    }
  } catch (error) {
    console.error('データの保存に失敗しました:', error)
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'データの保存に失敗しました',
    }
  }
}
