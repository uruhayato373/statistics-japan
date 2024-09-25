import path from 'path'

import { CardProps } from 'utils/props'
import calcRankingValues from 'utils/table/calcRankingValues'

import { ValueType } from '../types/value'

import saveJsonToFile from './saveJsonToFile'

export default async function saveRanking(
  cardProps: CardProps,
  values: ValueType[]
) {
  const filename = generateLocalFileName(cardProps)
  const filteredValues = values
    .filter((f) => f.areaCode !== '00000')
    .sort((a, b) => {
      const timeA = parseInt(a.timeCode, 10)
      const timeB = parseInt(b.timeCode, 10)
      return timeB - timeA
    })

  const latestTimeCode = filteredValues[0].timeCode

  const latestValues = filteredValues.filter(
    (f) => f.timeCode === latestTimeCode
  )

  const rankingValues = calcRankingValues(latestValues)

  saveJsonToFile(filename, rankingValues)
}

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
