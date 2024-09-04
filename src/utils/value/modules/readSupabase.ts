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

async function retry<T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> {
  try {
    return await fn()
  } catch (error) {
    if (retries <= 0) throw error
    console.log(`リトライ中... 残り試行回数: ${retries}`)
    await new Promise((resolve) => setTimeout(resolve, delay))
    return retry(fn, retries - 1, delay * 2)
  }
}

export default async function readSupabaseJson(
  cardProps: CardProps
): Promise<ValueType[] | null> {
  console.log('readSupabaseJson running')
  const { fieldId, menuId, cardId } = cardProps
  const path = `${fieldId}/${menuId}/${cardId}_values.json`

  console.log('Attempting to download file:', path)
  console.log('From bucket:', BUCKET_NAME)

  try {
    const result = await retry(async () => {
      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .download(path)

      if (error) {
        console.error('ダウンロードエラー:', error)
        console.error('エラーの詳細:', JSON.stringify(error, null, 2))
        // エラーオブジェクトの一般的なプロパティをログ出力
        if (typeof error === 'object' && error !== null) {
          console.error('エラータイプ:', error.constructor.name)
          console.error('エラーメッセージ:', (error as Error).message)
          if ('status' in error) {
            console.error(
              'エラーステータス:',
              (error as { status: unknown }).status
            )
          }
        }
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

      try {
        const parsed = JSON.parse(text) as ValueType[]
        console.log('パースされたデータの件数:', parsed.length)
        return parsed
      } catch (parseError) {
        console.error('JSONパースエラー:', parseError)
        console.error('受信したテキスト:', text)
        throw new Error('JSONのパースに失敗しました')
      }
    })

    return result
  } catch (error) {
    if (error instanceof Error) {
      console.error(`値の読み込みエラー: ${error.message}`)
      if (error.stack) {
        console.error('エラーのスタックトレース:', error.stack)
      }
    } else {
      console.error('予期せぬエラーが発生しました:', String(error))
    }
    return null
  }
}
