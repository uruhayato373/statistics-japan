import path from 'path'

import { RouterProps } from 'utils/props'

// 保存先のファイル名を生成
const generateFilePath = (cardProps: RouterProps, fileName: string) => {
  const { fieldId, menuId, pageId } = cardProps
  const filePath = path.join(
    process.cwd(),
    'local',
    'png',
    fieldId,
    menuId,
    'prefecture-rank',
    pageId,
    fileName
  )

  return filePath
}

export default generateFilePath
