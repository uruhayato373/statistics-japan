import { CardProps } from 'utils/props'

import { ValueType } from '../types/value'

import readLocalJson from './readLocal'

export async function readValues(
  cardProps: CardProps,
  areaCode?: string
): Promise<ValueType[] | null> {
  if (process.env.NODE_ENV === 'development') {
    return await readLocalJson(cardProps, areaCode)
  }

  // return await readSupabaseJson(cardProps)
}
