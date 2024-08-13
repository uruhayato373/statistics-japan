import { readFileSync } from 'fs'
import { join } from 'path'

import { ImageResponse } from 'next/og'

export default function Image({ params }: { params: { prefCode: string } }) {
  const imagePath = join(
    process.cwd(),
    'public',
    'images',
    'population',
    'total-population',
    'prefecture',
    `${params.prefCode}.png`
  )
  const imageData = readFileSync(imagePath)
  const imageBase64 = imageData.toString('base64')

  return new ImageResponse(
    (
      <div
        style={
          {
            /* ... */
          }
        }
      >
        <img
          src={`data:image/png;base64,${imageBase64}`}
          alt={`Prefecture ${params.prefCode}`}
          style={
            {
              /* ... */
            }
          }
        />
        {/* ... */}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
