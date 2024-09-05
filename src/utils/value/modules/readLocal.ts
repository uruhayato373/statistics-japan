import { promises as fs } from 'fs'

import { CardProps } from 'utils/props'

import { ValueType } from '../types/value'

import { generateLocalFileName } from './generateLocalFileName'

export default async function readLocalJson(
  cardProps: CardProps,
  areaCode?: string
): Promise<ValueType[]> {
  const filePath = generateLocalFileName(cardProps, areaCode)

  const rawData = await fs.readFile(filePath, 'utf-8')
  const values = JSON.parse(rawData)

  return values
}
