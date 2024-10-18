import { SupabaseClient } from '@supabase/supabase-js'

import { RouterProps } from 'utils/props'

const BUCKET_NAME = 'ogp'

const generateFileName = (routerProps: RouterProps) => {
  const { fieldId, menuId, kindId, pageId, prefCode } = routerProps
  const fileName = prefCode ? `${prefCode}.png` : `${pageId}.png`
  return `${fieldId}/${menuId}/${kindId}/${fileName}`
}

export default async function saveOGP(
  supabase: SupabaseClient,
  routerProps: RouterProps,
  pngBuffer: Buffer
) {
  const fileName = generateFileName(routerProps)

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
