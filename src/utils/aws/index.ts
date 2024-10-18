import { S3Client } from '@aws-sdk/client-s3'

import { RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

import loadValues from './modules/loadValues'
import saveValues from './modules/saveValues'

// 環境変数から認証情報を取得
const S3_REGION = process.env.S3_REGION || 'ap-northeast-1'
const S3_ACCESS_KEY_ID = process.env.S3_ACCESS_KEY_ID
const S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY

// 環境変数が設定されていない場合のエラーチェック
if (!S3_ACCESS_KEY_ID || !S3_SECRET_ACCESS_KEY) {
  throw new Error('AWS credentials are not set in environment variables')
}

const s3Client = new S3Client({
  region: S3_REGION,
  credentials: {
    accessKeyId: S3_ACCESS_KEY_ID,
    secretAccessKey: S3_SECRET_ACCESS_KEY,
  },
})

const handleAWS = (routerProps: RouterProps) => {
  return {
    loadValues: async () => {
      return await loadValues(s3Client, routerProps)
    },
    saveValues: async (values: ValueType[]) => {
      await saveValues(s3Client, routerProps, values)
    },
  }
}

export default handleAWS
