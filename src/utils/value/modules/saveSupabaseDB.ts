import { createClient } from '@supabase/supabase-js'

import { CardProps } from 'utils/props'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!

// const supabase = createClient(supabaseUrl, supabaseAnonKey)
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

export interface ValueType {
  timeCode: string
  timeName: string
  areaCode: string
  areaName: string
  categoryCode: string
  categoryName: string
  categoryUnit?: string
  unit: string
  value: number
}

let debugId = 0

async function insertOrUpdateData(
  tableName: string,
  values: ValueType[]
): Promise<number> {
  const currentDebugId = ++debugId
  console.log(
    `[Debug ${currentDebugId}] 挿入/更新開始: ${values.length}件のデータ`
  )
  console.log(
    `[Debug ${currentDebugId}] 最初のデータ:`,
    JSON.stringify(values[0], null, 2)
  )

  const { error, count } = await supabaseAdmin.from(tableName).upsert(values, {
    onConflict: 'timeCode, areaCode, categoryCode',
    ignoreDuplicates: false,
    count: 'exact',
  })

  if (error) {
    console.error(`[Debug ${currentDebugId}] データ更新エラーの詳細:`, error)
    throw new Error(`データの保存に失敗しました: ${error.message}`)
  }

  console.log(`[Debug ${currentDebugId}] 更新された行数:`, count)
  return count ?? 0
}

export async function saveSupabaseDB(
  cardProps: CardProps,
  values: ValueType[]
) {
  const tableName = `values_${cardProps.fieldId}`
  const currentDebugId = ++debugId

  console.log(
    `[Debug ${currentDebugId}] saveValues開始: ${values.length}件のデータ`
  )

  try {
    const validValues = values.filter(
      (value) =>
        typeof value.timeCode === 'string' &&
        typeof value.timeName === 'string' &&
        typeof value.areaCode === 'string' &&
        typeof value.areaName === 'string' &&
        typeof value.categoryCode === 'string' &&
        typeof value.categoryName === 'string' &&
        typeof value.categoryUnit === 'string' &&
        typeof value.unit === 'string' &&
        typeof value.value === 'number'
    )

    if (validValues.length !== values.length) {
      console.warn(
        `[Debug ${currentDebugId}] ${values.length - validValues.length}件の無効なデータがフィルタリングされました。`
      )
    }

    console.log(
      `[Debug ${currentDebugId}] 有効なデータ数: ${validValues.length}件`
    )

    const updatedCount = await insertOrUpdateData(tableName, validValues)

    console.log(
      `[Debug ${currentDebugId}] 更新完了: ${updatedCount}件のデータが更新されました`
    )

    if (updatedCount > 0) {
      return {
        success: true,
        message: `${updatedCount}件のデータが正常に保存されました`,
      }
    } else {
      return { success: false, message: 'データは更新されませんでした' }
    }
  } catch (error) {
    console.error(
      `[Debug ${currentDebugId}] データの保存に失敗しました:`,
      error
    )
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'データの保存に失敗しました',
    }
  }
}
