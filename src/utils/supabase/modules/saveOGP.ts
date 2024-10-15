import { SupabaseClient } from '@supabase/supabase-js'

const BUCKET_NAME = 'ogp'

export default async function saveOGP(
  supabase: SupabaseClient,
  fileName: string,
  pngBuffer: Buffer
) {
  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, pngBuffer, {
        contentType: 'image/png',
        upsert: true,
      })

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error(
      `ファイル "${fileName}" のアップロード中にエラーが発生しました:`,
      error
    )
    return null
  }
}
