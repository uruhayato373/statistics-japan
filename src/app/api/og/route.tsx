import fs from 'fs'
import path from 'path'

import { NextRequest } from 'next/server'

import sharp from 'sharp'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const prefCode = searchParams.get('prefCode') ?? '28000'
  const title = searchParams.get('title') ?? '総人口'

  const svgPath = path.join(
    process.cwd(),
    'public',
    'ogp',
    'japan',
    `00000.svg`
  )
  let svgContent = ''
  try {
    svgContent = fs.readFileSync(svgPath, 'utf-8')
    svgContent = svgContent.replace(/<\?xml[^>]*\?>/g, '')

    // 特定の都道府県のfillを変更
    const prefCodeShort = prefCode.substring(0, 2)
    svgContent = svgContent.replace(
      new RegExp(`<g[^>]*data-code="${prefCodeShort}"[^>]*>`, 'g'),
      (match) => match.replace(/fill="[^"]*"/, 'fill="url(#main)"')
    )
  } catch (error) {
    console.error(`Failed to read SVG file: ${error}`)
    return new Response('Error reading SVG file', { status: 500 })
  }

  // Base64エンコードされたNoto Sans JPフォント（TTF形式）
  const fontBase64 = fs.readFileSync(
    path.join(process.cwd(), 'public', 'fonts', 'NotoSansJP-Bold.ttf'),
    'base64'
  )

  const titleSvg = `
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <style type="text/css">
        @font-face {
          font-family: 'Noto Sans JP';
          src: url(data:font/truetype;charset=utf-8;base64,${fontBase64}) format('truetype');
          font-weight: bold;
          font-style: normal;
        }
      </style>
    </defs>
    <rect width="1200" height="630" fill="#f0f0f0" fill-opacity="0.7"/>
    ${svgContent}
    <rect x="10" y="10" width="1180" height="610" fill="none" stroke="#00bfff" stroke-width="20"/>
    <text x="100" y="200" font-family="'Noto Sans JP', Arial, sans-serif" font-size="90" font-weight="bold" fill="#778899">${title}</text>
    <text x="100" y="560" font-family="Arial" font-size="50" fill="#c0c0c0">statistics-japan.com</text>
  </svg>
  `

  try {
    const pngBuffer = await sharp(Buffer.from(titleSvg))
      .resize(1200, 630)
      .png()
      .toBuffer()

    return new Response(pngBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('Error generating image:', error)
    return new Response('Error generating image', { status: 500 })
  }
}
