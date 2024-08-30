import path from 'path'

import { RouterProps } from 'utils/props'

export interface SaveProps extends RouterProps {
  cardId: string
}

export function generateSaveValuesFilePath(saveProps: SaveProps) {
  const { fieldId, menuId, kindId, pageId, prefCode, cardId } = saveProps
  const filePath = path.join(
    process.cwd(),
    'src',
    'data',
    'cards',
    fieldId,
    menuId
  )
  switch (kindId) {
    case 'japan':
      return path.join(filePath, 'japan', `${cardId}`, 'values.json')
    case 'prefecture':
      return path.join(
        filePath,
        'prefecture',
        `${cardId}`,
        `${prefCode}_values.json`
      )
    case 'prefecture-rank':
      return path.join(
        filePath,
        'prefecture-rank',
        `${pageId}`,
        `${cardId}_values.json`
      )
  }
}
