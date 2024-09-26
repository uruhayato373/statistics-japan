'use server'

import handleOGP from 'utils/ogp'
import { RouterProps } from 'utils/props'

export async function actionSaveJapan(title: string, routerProps: RouterProps) {
  if (process.env.NODE_ENV === 'development') {
    // OGP画像を生成・保存
    const { saveJapanOGP } = handleOGP()
    await saveJapanOGP(title, routerProps)
  }
  return
}
