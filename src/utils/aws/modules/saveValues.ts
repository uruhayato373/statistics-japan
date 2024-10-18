import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

import { RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

const BUCKET_NAME = 'stats47-values'

const generateFileName = (routerProps: RouterProps) => {
  const { fieldId, menuId, cardId } = routerProps
  return `${fieldId}/${menuId}/${cardId}.json`
}

export default async function saveValues(
  s3Client: S3Client,
  routerProps: RouterProps,
  values: ValueType[]
) {
  try {
    const fileName = generateFileName(routerProps)

    const params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: JSON.stringify(values),
      ContentType: 'application/json',
    }

    const command = new PutObjectCommand(params)
    const response = await s3Client.send(command)

    if (response.$metadata.httpStatusCode === 200) {
      return {
        success: true,
        message: 'データが正常に保存されました',
        path: fileName,
      }
    } else {
      throw new Error('S3へのアップロードに失敗しました')
    }
  } catch (error) {
    console.error('データの保存に失敗しました:', error)
    if (error instanceof Error) {
      console.error('エラーメッセージ:', error.message)
      console.error('スタックトレース:', error.stack)
    }
    let errorMessage = 'データの保存に失敗しました'
    if (error instanceof Error) {
      errorMessage += `: ${error.message}`
    }
    return { success: false, message: errorMessage }
  }
}
