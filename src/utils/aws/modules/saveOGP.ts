import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

import { RouterProps } from 'utils/props'

const BUCKET_NAME = 'stats47-ogp'

const generateFileName = (routerProps: RouterProps) => {
  const { fieldId, menuId, kindId, pageId, prefCode } = routerProps
  const fileName = prefCode ? `${prefCode}.png` : `${pageId}.png`
  return `${fieldId}/${menuId}/${kindId}/${fileName}`
}

export default async function saveOGP(
  s3Client: S3Client,
  routerProps: RouterProps,
  pngBuffer: Buffer
) {
  const fileName = generateFileName(routerProps)

  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: pngBuffer,
    ContentType: 'image/png',
  }

  try {
    const command = new PutObjectCommand(params)
    const response = await s3Client.send(command)

    return { fileName, etag: response.ETag }
  } catch (error) {
    console.error(
      `ファイル "${fileName}" のアップロード中にエラーが発生しました:`,
      error
    )
    return null
  }
}
