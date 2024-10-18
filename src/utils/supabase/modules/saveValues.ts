import { SupabaseClient } from '@supabase/supabase-js'

import { RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

const BUCKET_NAME = 'values'

const generateFileName = (routerProps: RouterProps) => {
  const { fieldId, menuId, cardId } = routerProps
  return `${fieldId}/${menuId}//${cardId}.json`
}

export default async function saveValues(
  supabase: SupabaseClient,
  routerProps: RouterProps,
  values: ValueType[]
) {
  try {
    const fileName = generateFileName(routerProps)

    // JSONをStringifyして保存
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, JSON.stringify(values), {
        contentType: 'application/json',
        upsert: true, // 既存ファイルを上書き
      })

    if (error) {
      console.error('ストレージへの保存エラー:', error)
      console.error('エラーの詳細:', JSON.stringify(error, null, 2))
      throw new Error(`データの保存に失敗しました: ${error.message}`)
    }

    return {
      success: true,
      message: 'データが正常に保存されました',
      path: data.path,
    }
  } catch (error) {
    console.error('データの保存に失敗しました:', error)
    if (error instanceof Error) {
      console.error('エラーメッセージ:', error.message)
      console.error('スタックトレース:', error.stack)
    }
    let errorMessage = 'データの保存に失敗しました'
    if (error instanceof Error) {
      errorMessage += `: ${error.message}`
    }
    return { success: false, message: errorMessage }
  }
}
