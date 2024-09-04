import path from 'path'

import { CardProps } from 'utils/props'

export function generateLocalFileName(cardProps: CardProps) {
  const { fieldId, menuId, cardId } = cardProps
  const filePath = path.join(
    process.cwd(),
    'local',
    'cards',
    fieldId,
    menuId,
    `${cardId}_values.json`
  )

  return filePath
}
