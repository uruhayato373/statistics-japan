import { createClient } from '@supabase/supabase-js'

import { CardProps } from 'utils/props'

import { ValueType } from '../types/value'

// サーバーサイドでのみ使用する環境変数
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Supabaseの環境変数が設定されていません')
}

// サービスロールキーを使用してクライアントを作成
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { persistSession: false },
})

async function createTableIfNotExists(tableName: string) {
  const { error } = await supabase.rpc('create_dynamic_table', {
    table_name: tableName,
  })
  if (error) {
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
    const { error: upsertError } = await supabase
      .from(tableName)
      .upsert(extendedValues, {
        onConflict: 'menuid, cardid, timecode, areacode, categorycode',
        ignoreDuplicates: false,
      })

    if (upsertError) {
      console.error('Upsertエラー:', upsertError)
      throw new Error(`データの保存に失敗しました: ${upsertError.message}`)
    }

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
