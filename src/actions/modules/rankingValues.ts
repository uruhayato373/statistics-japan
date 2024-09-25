import path from 'path'

import fs from 'fs-extra'

import { CardProps } from 'utils/props'
import { RankingValueType } from 'utils/table/calcRankingValues'

// 保存先のファイル名を生成
function generateLocalFileName(cardProps: CardProps) {
  const { fieldId, menuId, cardId } = cardProps
  const filename = `${cardId}_ranking.json`
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

export default async function saveRankingValues(
  cardProps: CardProps,
  values: RankingValueType[]
) {
  const filename = generateLocalFileName(cardProps)
  await fs.outputJson(filename, values, { spaces: 2 })

  return
}
