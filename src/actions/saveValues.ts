'use server'

import { CardProps } from 'utils/props'
import handleValue, { ValueType } from 'utils/value'

export async function actionSaveValues(
  cardProps: CardProps,
  values: ValueType[]
) {
  // 開発環境の場合
  if (process.env.NODE_ENV === 'development') {
    // valuesを保存
    const { saveValues } = handleValue()
    saveValues(cardProps, values)
  }
}
