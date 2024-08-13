import { ImageResponse } from 'next/og'

import { handlePrefecture } from 'utils/prefecture'

export const runtime = 'edge'

export const alt = '都道府県の OGP 画像'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/svg+xml'

export default async function Image({
  params,
}: {
  params: { prefCode: string }
}) {
  const { prefCode } = params

  const { findItem } = handlePrefecture()

  const prefectureName = (await findItem(prefCode)).prefName

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f0f0f0',
        }}
      >
        <svg width="1200" height="630" viewBox="0 0 1200 630">
          <rect width="1200" height="630" fill="#f0f0f0" />
          <text
            x="600"
            y="300"
            fontSize="60"
            fontWeight="bold"
            textAnchor="middle"
            fill="#333333"
          >
            {prefectureName}の統計データ
          </text>
          {/* ここに都道府県の形状のSVGパスを追加できます */}
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}

export function generateImageMetadata() {
  return [
    {
      contentType: 'image/svg+xml',
      size: { width: 1200, height: 630 },
      id: 'og-image',
    },
  ]
}
