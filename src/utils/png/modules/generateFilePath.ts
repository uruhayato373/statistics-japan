import path from 'path'

import { RouterPropsType } from 'types/apps'

// 保存先のファイル名を生成
const generateFilePath = (routerProps: RouterPropsType, fileName: string) => {
  const { fieldId, menuId, kindId, pageId, cardId } = routerProps

  // kindIdに応じてpageIdまたはcardIdを選択
  const idToUse =
    kindId === 'prefecture-rank' ? pageId : kindId === 'japan' ? cardId : pageId // デフォルトはpageIdを使用

  const filePath = path.join(
    process.cwd(),
    'local',
    'png',
    fieldId,
    menuId,
    kindId,
    idToUse, // 選択されたIDを使用
    fileName
  )

  return filePath
}

export default generateFilePath
