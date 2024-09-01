import path from 'path'

import { CardProps } from 'utils/props'

export function generateSaveValuesFilePath(cardProps: CardProps) {
  const { fieldId, menuId, kindId, pageId, cardId } = cardProps
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
      return path.join(filePath, 'japan', `${cardId}_values.json`)
    case 'prefecture':
      return path.join(filePath, 'prefecture', `${cardId}_values.json`)
    case 'prefecture-rank':
      return path.join(
        filePath,
        'prefecture-rank',
        `${pageId}`,
        `${cardId}_values.json`
      )
  }
}
