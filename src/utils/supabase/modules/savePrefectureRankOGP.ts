import { createClient } from '@supabase/supabase-js'
import sharp from 'sharp'

import generatePrefectureRankSVG from 'utils/ogp/modules/generatePrefectureRankSVG'
import { RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

// Supabaseクライアントの初期化
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ファイル名を生成
const generateFileName = (routerProps: RouterProps) => {
  const { fieldId, menuId, pageId } = routerProps
  return `${fieldId}/${menuId}/prefecture-rank/${pageId}.png`
}

export default async function savePrefectureRankOGP(
  title: string,
  routerProps: RouterProps,
  values: ValueType[]
) {
  // 開発環境でのみ実行
  if (process.env.NODE_ENV !== 'development') {
    return
  }

  try {
    // SVGを生成
    const svgString = await generatePrefectureRankSVG(title, values)

    // SVGをPNGに変換
    const pngBuffer = await sharp(Buffer.from(svgString)).png().toBuffer()

    // ファイル名を生成
    const fileName = generateFileName(routerProps)

    // Supabaseのストレージにアップロード
    const { data, error } = await supabase.storage
      .from('ogp') // バケット名を適切に設定してください
      .upload(fileName, pngBuffer, {
        contentType: 'image/png',
        upsert: true, // 同名のファイルが存在する場合は上書き
      })

    if (error) {
      console.error('Error uploading file:', error)
      return
    }

    console.log('File uploaded successfully:', data.path)

    // アップロードされたファイルの公開URLを取得
    const {
      data: { publicUrl },
      error: urlError,
    } = supabase.storage.from('ogp-images').getPublicUrl(fileName)

    if (urlError) {
      console.error('Error getting public URL:', urlError)
      return
    }

    console.log('Public URL:', publicUrl)

    return publicUrl
  } catch (error) {
    console.error('Error in savePrefectureRankPNG:', error)
  }
}
