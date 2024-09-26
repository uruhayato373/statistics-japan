import { createClient, SupabaseClient } from '@supabase/supabase-js'

import { CardProps } from 'utils/props'
import { RankingValueType } from 'utils/table/calcRankingValues'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabaseの環境変数が設定されていません')
}

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)

export default async function saveRankingDB(
  cardProps: CardProps,
  values: RankingValueType[]
) {
  const { fieldId, menuId, cardId } = cardProps

  try {
    const tableName = `prefectureranking`
    console.log(`テーブル名: ${tableName}`)

    // テーブルが存在しない場合は作成
    const { data: createTableData, error: createTableError } =
      await supabase.rpc('create_values_table_if_not_exists', {
        table_name: tableName,
      })

    if (createTableError) {
      console.error('テーブル作成エラー:', createTableError)
      throw new Error(
        `テーブルの作成に失敗しました: ${createTableError.message}`
      )
    }

    console.log('テーブル作成結果:', createTableData)

    // menuIdとcardIdを含めてデータを拡張
    const extendedValues = values.map((value) => ({
      fieleid: fieldId,
      menuid: menuId,
      cardid: cardId,
      timecode: value.timeCode,
      areacode: value.areaCode,
      categorycode: value.categoryCode,
      categoryname: value.categoryName,
      categoryunit: value.categoryUnit,
      areaname: value.areaName,
      timename: value.timeName,
      unit: value.unit,
      value: value.value,
      deviationvalue: value.deviationValue,
      rank: value.rank,
    }))

    console.log('挿入/更新するデータ例:', extendedValues[0])

    // データを一括でupsert（挿入または更新）
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
