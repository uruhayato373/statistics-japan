import path from 'path'

import { CardProps } from 'utils/props'

// 保存先のファイル名を生成
const generateFilePath = (cardProps: CardProps, fileName: string) => {
  const { fieldId, menuId, cardId } = cardProps
  const filePath = path.join(
    process.cwd(),
    'local',
    'png',
    fieldId,
    menuId,
    'prefecture-rank',
    cardId,
    fileName
  )

  return filePath
}

export default generateFilePath
