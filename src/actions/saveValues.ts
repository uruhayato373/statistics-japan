'use server'

import { CardProps } from 'utils/props'
import handleValue, { ValueType } from 'utils/value'

export async function actionSaveValues(
  cardProps: CardProps,
  values: ValueType[]
) {
  if (process.env.NODE_ENV === 'development') {
    if (cardProps.kindId === 'prefecture-rank') {
      const { saveValues, saveRanking } = handleValue()
      saveValues(cardProps, values)
      saveRanking(cardProps, values)
    }
  }
}
