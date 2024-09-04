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
  // スラッシュで始まる場合は削除
  path = path.replace(/^\/+/, '')
  // 連続するスラッシュを単一のスラッシュに置換
  path = path.replace(/\/+/g, '/')
  // URLエンコードを行うが、スラッシュはエンコードしない
  return path
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')
}

export default async function readSupabaseJson(
  cardProps: CardProps
): Promise<ValueType[] | null> {
  console.log('readSupabaseJson running')
  const { fieldId, menuId, cardId } = cardProps

  const rawPath = `${fieldId}/${menuId}/${cardId}_values.json`
  const path = sanitizePath(rawPath)

  console.log('Raw path:', rawPath)
  console.log('Sanitized path:', path)
  console.log('From bucket:', BUCKET_NAME)

  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .download(path)

    if (error) {
      console.error('ダウンロードエラー:', error)
      console.error('エラーの詳細:', JSON.stringify(error, null, 2))
      throw error
    }

    if (!data) {
      throw new Error('ダウンロードされたデータが空です')
    }

    const text = await data.text()
    if (!text.trim()) {
      throw new Error('ダウンロードされたファイルの内容が空です')
    }

    console.log('ファイルの内容:', text.substring(0, 100) + '...') // 最初の100文字のみログ出力

    const parsed = JSON.parse(text) as ValueType[]
    console.log('パースされたデータの件数:', parsed.length)
    return parsed
  } catch (error) {
    console.error('エラーが発生しました:', error)
    if (error instanceof Error) {
      console.error('エラーメッセージ:', error.message)
      console.error('スタックトレース:', error.stack)
    }
    return null
  }
}
