import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

import handlePrefecture from 'utils/prefecture'
import { ValueType } from 'utils/value'

import generateFileName from './generateFileName'

import { RouterPropsType } from 'types/apps'

const BUCKET_NAME = 'stats47-values'

interface UploadResult {
  success: boolean
  message: string
  path?: string
}

async function uploadToS3(
  s3Client: S3Client,
  fileName: string,
  data: string
): Promise<UploadResult> {
  try {
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: data,
      ContentType: 'application/json',
    })
    await s3Client.send(command)
    return {
      success: true,
      message: 'データが正常に保存されました',
      path: fileName,
    }
  } catch (error) {
    return {
      success: false,
      message: `S3へのアップロードに失敗しました: ${error instanceof Error ? error.message : 'Unknown error'}`,
    }
  }
}

async function uploadJapanData(
  s3Client: S3Client,
  routerProps: RouterPropsType,
  values: ValueType[]
): Promise<UploadResult> {
  const fileName = generateFileName(routerProps)
  const filteredValues = values.filter((f) => f.areaCode === '00000')
  return uploadToS3(s3Client, fileName, JSON.stringify(filteredValues))
}

async function uploadPrefectureData(
  s3Client: S3Client,
  routerProps: RouterPropsType,
  values: ValueType[]
): Promise<UploadResult> {
  const prefectures = handlePrefecture().fetchItems()
  const allResults = await Promise.all(
    prefectures.map(async (prefecture) => {
      const prefFileName = generateFileName({
        ...routerProps,
        prefCode: prefecture.prefCode,
      })
      const prefData = JSON.stringify(
        values.filter((v) => v.areaCode === prefecture.prefCode)
      )
      return uploadToS3(s3Client, prefFileName, prefData)
    })
  )

  const successCount = allResults.filter((r) => r.success).length
  return {
    success: successCount === prefectures.length,
    message: `${successCount}/${prefectures.length} 件の都道府県データが保存されました`,
    path: routerProps.kindId,
  }
}

async function uploadPrefectureRankData(
  s3Client: S3Client,
  routerProps: RouterPropsType,
  values: ValueType[]
): Promise<UploadResult> {
  const fileName = generateFileName(routerProps)
  const filteredValues = values.filter((f) => f.areaCode !== '00000')
  return uploadToS3(s3Client, fileName, JSON.stringify(filteredValues))
}

export default async function saveValues(
  s3Client: S3Client,
  routerProps: RouterPropsType,
  values: ValueType[]
): Promise<UploadResult> {
  try {
    switch (routerProps.kindId) {
      case 'japan':
        return await uploadJapanData(s3Client, routerProps, values)
      case 'prefecture':
        return await uploadPrefectureData(s3Client, routerProps, values)
      case 'prefecture-rank':
        return await uploadPrefectureRankData(s3Client, routerProps, values)
      default:
        throw new Error(`Unsupported kindId: ${routerProps.kindId}`)
    }
  } catch (error) {
    return {
      success: false,
      message: `データの保存に失敗しました: ${error instanceof Error ? error.message : 'Unknown error'}`,
    }
  }
}
