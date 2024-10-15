// 環境変数の検証と取得
const getEnvVariable = (key: string): string => {
  const value = process.env[key]
  if (!value) {
    throw new Error(`環境変数 ${key} が設定されていません`)
  }
  return value
}

export default getEnvVariable
