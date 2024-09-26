'use server'

import handleOGP from 'utils/ogp'
import { RouterProps } from 'utils/props'

export async function actionSavePrefecture(
  title: string,
  routerProps: RouterProps
) {
  if (process.env.NODE_ENV === 'development') {
    // OGP画像を生成・保存
    const { savePrefectureOGP } = handleOGP()
    await savePrefectureOGP(title, routerProps)
  }
  return
}
