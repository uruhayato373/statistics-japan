import { createClient, SupabaseClient } from '@supabase/supabase-js'

import { CardProps } from 'utils/props'

import { ValueType } from '../types/value'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabaseの環境変数が設定されていません')
}

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)

const BUCKET_NAME = 'cards'

function sanitizePath(path: string): string {
  path = path.replace(/^\/+/, '')
  path = path.replace(/\/+/g, '/')
  return path
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')
}

export default async function readSupabaseJson(
  cardProps: CardProps
): Promise<ValueType[]> {
  const { fieldId, menuId, cardId } = cardProps

  const rawPath = `${fieldId}/${menuId}/${cardId}_values.json`
  const path = sanitizePath(rawPath)

  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .download(path)

    if (error) {
      throw error
    }

    if (!data) {
      throw new Error('ダウンロードされたデータがnullです')
    }

    const text = await data.text()
    if (!text.trim()) {
      throw new Error('ダウンロードされたファイルの内容が空です')
    }

    const parsed = JSON.parse(text) as ValueType[]
    console.log('パースされたデータの件数:', parsed.length)
    return parsed
  } catch (error) {
    console.error('エラーが発生しました:', error)
    if (error instanceof Error) {
      console.error('エラーメッセージ:', error.message)
      console.error('スタックトレース:', error.stack)
    }
    // エラーが発生した場合は空の配列を返す
    return []
  }
}
