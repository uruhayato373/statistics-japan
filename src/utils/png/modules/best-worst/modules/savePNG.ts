import fs from 'fs/promises'
import path from 'path'

import sharp from 'sharp'

// SVGをPNGに変換して保存
const savePNG = async (svgString: string, filePath: string) => {
  try {
    // ディレクトリが存在しない場合は作成
    await fs.mkdir(path.dirname(filePath), { recursive: true })

    // SVGを最適化されたPNGに直接変換
    await sharp(Buffer.from(svgString)).png({ quality: 90 }).toFile(filePath)

    // console.log(`Optimized PNG file saved: ${filePath}`)
  } catch (error) {
    console.error('Error saving SVG and optimized PNG:', error)
  }
}

export default savePNG
