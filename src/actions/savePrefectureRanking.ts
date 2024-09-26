'use server'

import handleOGP from 'utils/ogp'
import handlePNG from 'utils/png'
import { CardProps } from 'utils/props'
import calcRankingValues, {
  RankingValueType,
} from 'utils/table/calcRankingValues'
import { ValueType } from 'utils/value'

import saveRankingDB from './modules/rankingDB'
import saveRankingValues from './modules/rankingValues'

export async function actionSavePrefectureRanking(
  title: string,
  cardProps: CardProps,
  values: ValueType[]
) {
  const rankingValues = formatRankingValues(cardProps, values)
  if (process.env.NODE_ENV === 'development') {
    // ランキング用の値を計算・保存
    await saveRankingValues(cardProps, rankingValues)

    // PNG画像を生成・保存
    const { saveBestWorstPNG } = handlePNG()
    await saveBestWorstPNG(title, cardProps, rankingValues)

    // OGP画像を生成・保存
    const { savePrefectureRankOGP } = handleOGP()
    await savePrefectureRankOGP(title, cardProps, rankingValues)
  } else {
    // supabaseにデータを保存
    await saveRankingDB(cardProps, rankingValues)
  }

  return
}

function formatRankingValues(
  cardProps: CardProps,
  values: ValueType[]
): RankingValueType[] {
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

  return calcRankingValues(latestValues).map((d) => {
    return {
      ...d,
      categoryCode: cardProps.cardId,
    }
  })
}
