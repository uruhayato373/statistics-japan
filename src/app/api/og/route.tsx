import fs from 'fs'
import path from 'path'

import { NextRequest } from 'next/server'

import sharp from 'sharp'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const prefName = searchParams.get('prefName') ?? 'Default Title'
  const prefCode = searchParams.get('prefCode') ?? '01000'

  const svgPath = path.join(
    process.cwd(),
    'public',
    'prefectures',
    `${prefCode}.svg`
  )
  let svgContent = ''
  try {
    svgContent = fs.readFileSync(svgPath, 'utf-8')
    // SVGの内容から<?xml ...?>宣言を削除
    svgContent = svgContent.replace(/<\?xml[^>]*\?>/g, '')
  } catch (error) {
    console.error(`Failed to read SVG file: ${error}`)
    return new Response('Error reading SVG file', { status: 500 })
  }

  const titleSvg = `
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#f0f0f0"/>
    <rect x="10" y="10" width="1180" height="610" fill="none" stroke="#00bfff" stroke-width="20"/>
    <text x="100" y="200" font-family="Arial" font-size="90" font-weight="bold" fill="#778899" >${prefName}の</text>
    <text x="100" y="350" font-family="Arial" font-size="90" font-weight="bold" fill="#778899" >総人口</text>
    <text x="100" y="560" font-family="Arial" font-size="50" fill="#c0c0c0" >statistics-japan.com</text>
    ${svgContent}
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
