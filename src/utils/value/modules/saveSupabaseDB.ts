import { createClient } from '@supabase/supabase-js'

import { CardProps } from 'utils/props'

import { ValueType } from '../types/value'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function refreshSchemaCache() {
  const { error } = await supabase.rpc('refresh_schema_cache')
  if (error)
    throw new Error(`スキーマキャッシュの更新に失敗しました: ${error.message}`)
}

async function createOrUpdateTable(tableName: string) {
  const { error } = await supabase.rpc('create_or_update_values_table', {
    p_table_name: tableName,
  })
  if (error)
    throw new Error(`テーブルの作成または更新に失敗しました: ${error.message}`)
}

async function insertOrUpdateData(tableName: string, values: ValueType[]) {
  const { error } = await supabase.from(tableName).upsert(values, {
    onConflict: 'timeCode, areaCode, categoryCode',
    ignoreDuplicates: false,
  })
  if (error) throw new Error(`データの保存に失敗しました: ${error.message}`)
}

export async function saveSupabaseDB(
  cardProps: CardProps,
  values: ValueType[]
) {
  const tableName = `${cardProps.fieldId}`

  try {
    await refreshSchemaCache()
    await createOrUpdateTable(tableName)
    // スキーマの変更が反映されるまで少し待機
    await new Promise((resolve) => setTimeout(resolve, 1000))
    await insertOrUpdateData(tableName, values)
    return { success: true, message: 'データが正常に保存されました' }
  } catch (error) {
    console.error('データの保存に失敗しました:', error)
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'データの保存に失敗しました',
    }
  }
}
