import { createClient } from '@supabase/supabase-js'

import { CardProps } from 'utils/props'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

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
  categoryUnit: string
  unit: string
  value: number
}

async function insertOrUpdateData(
  tableName: string,
  values: ValueType[]
): Promise<number> {
  console.log('挿入/更新するデータの例:', values[0])

  const { error, count } = await supabaseAdmin.from(tableName).upsert(values, {
    onConflict: 'timeCode, areaCode, categoryCode',
    ignoreDuplicates: false,
    count: 'exact',
  })

  if (error) {
    console.error('データ更新エラーの詳細:', error)
    throw new Error(`データの保存に失敗しました: ${error.message}`)
  }

  console.log('更新された行数:', count)
  return count ?? 0
}

export async function saveValues(cardProps: CardProps, values: ValueType[]) {
  const tableName = `values_${cardProps.fieldId}`

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
        `${values.length - validValues.length}件の無効なデータがフィルタリングされました。`
      )
    }

    const updatedCount = await insertOrUpdateData(tableName, validValues)

    if (updatedCount > 0) {
      return {
        success: true,
        message: `${updatedCount}件のデータが正常に保存されました`,
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
