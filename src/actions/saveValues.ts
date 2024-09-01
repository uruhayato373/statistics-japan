'use server'

import { CardProps } from 'utils/props'
import handleValue, { ValueType } from 'utils/value'

export async function actionSaveValues(
  cardProps: CardProps,
  values: ValueType[]
) {
  const { saveValues } = handleValue(cardProps)
  return saveValues(values)
}
