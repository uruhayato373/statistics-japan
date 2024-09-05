import { createClient } from '@supabase/supabase-js'

import { CardProps } from 'utils/props'

import { ValueType } from '../types/value'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Supabaseの環境変数が設定されていません')
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { persistSession: false },
})

async function createTableIfNotExists(tableName: string) {
  try {
    const { data, error } = await supabase.rpc(
      'create_values_table_if_not_exists',
      { table_name: tableName }
    )
    if (error) throw error
    console.log('テーブル作成結果:', data)
  } catch (error) {
    console.error('テーブル作成エラー:', error)
    throw new Error(`テーブルの作成に失敗しました: ${error.message}`)
  }
}

export default async function saveSupabaseDB(
  cardProps: CardProps,
  values: ValueType[]
) {
  const { fieldId, menuId, cardId } = cardProps

  try {
    const tableName = `${fieldId}`

    console.log('使用中のSupabase URL:', supabaseUrl)
    console.log('テーブル名:', tableName)

    // テーブルが存在しない場合は作成
    await createTableIfNotExists(tableName)

    // データの準備
    const extendedValues = values.map((value) => ({
      categorycode: value.categoryCode,
      categoryname: value.categoryName,
      categoryunit: value.categoryUnit,
      areacode: value.areaCode,
      areaname: value.areaName,
      timecode: value.timeCode,
      timename: value.timeName,
      unit: value.unit,
      value: value.value,
      menuid: menuId,
      cardid: cardId,
    }))

    // データのupsert
    const { data: upsertData, error: upsertError } = await supabase
      .from(tableName)
      .upsert(extendedValues, {
        onConflict: 'menuid, cardid, timecode, areacode, categorycode',
        ignoreDuplicates: false,
      })

    if (upsertError) {
      console.error('Upsertエラー:', upsertError)
      throw new Error(`データの保存に失敗しました: ${upsertError.message}`)
    }

    console.log('Upsert結果:', upsertData)

    return { success: true, message: 'データが正常に保存されました' }
  } catch (error) {
    console.error('データの保存に失敗しました:', error)
    let errorMessage = 'データの保存に失敗しました'
    if (error instanceof Error) {
      errorMessage += `: ${error.message}`
    }
    return { success: false, message: errorMessage }
  }
}
