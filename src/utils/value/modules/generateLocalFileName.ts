import path from 'path'

import { CardProps } from 'utils/props'

export function generateLocalFileName(cardProps: CardProps, areaCode?: string) {
  const { fieldId, menuId, cardId } = cardProps
  const filename = areaCode ? `${cardId}_${areaCode}.json` : `${cardId}.json`
  const filePath = path.join(
    process.cwd(),
    'local',
    'cards',
    fieldId,
    menuId,
    filename
  )

  return filePath
}
