'use server'

import { CardProps } from 'utils/props'
import calcRankingValues, {
  RankingValueType,
} from 'utils/table/calcRankingValues'
import { ValueType } from 'utils/value'

// import saveRankingDB from './modules/rankingDB'
import saveRankingValues from './modules/rankingValues'
import saveSvgInstagram from './modules/svgInstagram'
import saveSvgX from './modules/svgX'

export async function actionSavePrefectureRanking(
  title: string,
  cardProps: CardProps,
  values: ValueType[]
) {
  // ランキング用の値を計算・保存
  const rankingValues = formatRankingValues(cardProps, values)
  await saveRankingValues(cardProps, rankingValues)

  // X用のSVGを生成・保存（1200x630）
  await saveSvgX(title, cardProps, rankingValues)

  // instagram用のSVGを生成・保存（1080x1080）
  await saveSvgInstagram(title, cardProps, rankingValues)

  // await saveRankingDB(cardProps, rankingValues)

  return
}

function formatRankingValues(
  cardProps: CardProps,
  values: ValueType[]
): RankingValueType[] {
  const filteredValues = values.sort((a, b) => {
    const timeA = parseInt(a.timeCode, 10)
    const timeB = parseInt(b.timeCode, 10)
    return timeB - timeA
  })

  const latestTimeCode = filteredValues[0].timeCode

  const latestValues = filteredValues.filter(
    (f) => f.timeCode === latestTimeCode
  )

  return calcRankingValues(latestValues).map((d) => {
    return {
      ...d,
      categoryCode: cardProps.cardId,
    }
  })
}
