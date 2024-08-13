import { ImageResponse } from '@vercel/og'
import { handlePrefecture } from 'utils/prefecture'

export const runtime = 'edge'

export function generateImageMetadata() {
  return [
    {
      contentType: 'image/png',
      size: { width: 1200, height: 630 },
      id: 'og-image',
    },
  ]
}

async function getPrefectureData(prefCode: string) {
  const { findItem } = handlePrefecture()
  const prefecture = await findItem(prefCode)
  return prefecture
}

export default async function Image({
  params,
}: {
  params: { prefCode: string }
}) {
  const { prefCode } = params

  const prefecture = await getPrefectureData(prefCode)

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
            y="250"
            fontSize="60"
            fontWeight="bold"
            textAnchor="middle"
            fill="#333333"
          >
            {prefecture.prefName}の統計データ
          </text>
          <text
            x="600"
            y="350"
            fontSize="40"
            textAnchor="middle"
            fill="#666666"
          >
            人口: 200000人
          </text>
        </svg>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
