// app/(dashboard)/population/total-population/prefecture/[prefCode]/opengraph-image.tsx

import { promises as fs } from 'fs'
import path from 'path'

import { ImageResponse } from 'next/og'

export const runtime = 'nodejs' // Change to 'nodejs' if edge runtime is not supported

export default async function Image({
  params,
}: {
  params: { prefCode: string }
}) {
  try {
    // Construct the correct path to the image
    const imagePath = path.join(
      process.cwd(),
      'public',
      'images',
      'population',
      'total-population',
      'prefecture',
      `${params.prefCode}.png`
    )

    // Read the image file
    const imageBuffer = await fs.readFile(imagePath)
    const imageBase64 = imageBuffer.toString('base64')

    // Generate the image response
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
          <img
            src={`data:image/png;base64,${imageBase64}`}
            alt={`Prefecture ${params.prefCode}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              padding: '10px',
              borderRadius: '5px',
            }}
          >
            <h2 style={{ margin: 0 }}>Prefecture Code: {params.prefCode}</h2>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (error) {
    console.error('Error generating OG image:', error)

    // Fallback image response
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#f0f0f0',
            fontFamily: 'sans-serif',
          }}
        >
          <h1>Image Not Available</h1>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  }
}
