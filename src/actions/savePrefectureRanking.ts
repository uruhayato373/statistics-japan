'use server'

import handleOGP from 'utils/ogp'
import handlePNG from 'utils/png'
import { RouterProps } from 'utils/props'
import calcRankingValues, {
  RankingValueType,
} from 'utils/table/calcRankingValues'
import { ValueType } from 'utils/value'

import saveRankingDB from './modules/rankingDB'

export async function actionSavePrefectureRanking(
  title: string,
  routerProps: RouterProps,
  values: ValueType[]
) {
  const rankingValues = formatRankingValues(values)

  return {
    // OGP画像を生成・保存
    savePrefectureRankOGP: async () => {
      const { savePrefectureRankOGP } = handleOGP()
      await savePrefectureRankOGP(title, routerProps, rankingValues)
    },
    // supabaseにデータを保存
    saveRankingDB: async () => {
      await saveRankingDB(routerProps, rankingValues)
    },
    // ベスト5・ワースト5の画像を生成・保存
    saveBestWorstPNG: async () => {
      const { saveBestWorstPNG } = handlePNG()
      await saveBestWorstPNG(title, routerProps, rankingValues)
    },
    // 相関図の画像を生成・保存
    saveCorrelationPNG: async () => {
      const { saveCorrelationPNG } = handlePNG()
      await saveCorrelationPNG(title, routerProps, values)
    },
  }
}

function formatRankingValues(values: ValueType[]): RankingValueType[] {
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

  return calcRankingValues(latestValues)
}
