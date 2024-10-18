import {
  S3Client,
  GetObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3'

import { RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

const BUCKET_NAME = 'stats47-values' // S3バケット名を指定

export default async function loadValues(
  s3Client: S3Client,
  routerProps: RouterProps
): Promise<ValueType[] | null> {
  const { fieldId, menuId, cardId } = routerProps
  const fileName = `${fieldId}/${menuId}/${cardId}.json`

  if (!cardId) {
    console.error(`cardIdが指定されていません。ファイル名: ${fileName}`)
    return null
  }

  try {
    // ファイルの存在確認
    const listCommand = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: fileName.split('/').slice(0, -1).join('/'),
      MaxKeys: 1,
    })

    const listResponse = await s3Client.send(listCommand)

    if (!listResponse.Contents || listResponse.Contents.length === 0) {
      console.error(`ファイルが存在しません: ${fileName}`)
      return null
    }

    // ファイルのダウンロード
    const getCommand = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileName,
    })

    const { Body } = await s3Client.send(getCommand)

    if (!Body) {
      console.error('ダウンロードされたデータが空です')
      return null
    }

    // ストリームからテキストを読み込む
    const streamToString = (stream: NodeJS.ReadableStream): Promise<string> =>
      new Promise((resolve, reject) => {
        const chunks: Uint8Array[] = []
        stream.on('data', (chunk) => chunks.push(chunk))
        stream.on('error', reject)
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')))
      })

    const text = await streamToString(Body as NodeJS.ReadableStream)

    // JSONをパース
    const values: ValueType[] = JSON.parse(text)

    return values
  } catch (error) {
    console.error('データの読み込みに失敗しました:', error)
    if (error instanceof Error) {
      console.error('エラーメッセージ:', error.message)
      console.error('スタックトレース:', error.stack)
    }
    return null
  }
}
