import { CardProps } from 'utils/props'

import { ValueType } from '../types/value'

import saveLocalJson from './saveLocal'
// import saveSupabaseDB from './saveSupabaseDB'

export async function saveValues(cardProps: CardProps, values: ValueType[]) {
  if (process.env.NODE_ENV === 'development') {
    return await saveLocalJson(cardProps, values)
  }
  return null

  // return await saveSupabaseDB(cardProps, values)
}
