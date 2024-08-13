// app/prefecture/[prefCode]/opengraph-image.tsx

import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export default async function Image({
  params,
}: {
  params: { prefCode: string }
}) {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#f0f0f0',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Background Image */}
        <img
          src={`https://statistics-japan.com/images/total-population/prefecture${params.prefCode}.png`}
          alt={`Prefecture ${params.prefCode}`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.3,
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
