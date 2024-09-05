'use server'

import { CardProps } from 'utils/props'
import { ValueType } from 'utils/value'

export async function actionSaveValues(
  cardProps: CardProps,
  values: ValueType[]
) {
  // console.log(cardProps, values)
  const data = [cardProps, values]
  return data
  // const { saveValues } = handleValue()
  // return saveValues(cardProps, values)
}
