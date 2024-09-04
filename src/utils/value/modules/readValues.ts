import { CardProps } from 'utils/props'

import { ValueType } from '../types/value'

import readLocalJson from './readLocal'
import readSupabaseJson from './readSupabase'

export async function readValues(
  cardProps: CardProps
): Promise<ValueType[] | null> {
  if (process.env.NODE_ENV === 'development') {
    return await readLocalJson(cardProps)
  }

  return await readSupabaseJson(cardProps)
}
