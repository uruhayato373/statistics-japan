'use server'

import { DocumentType } from 'utils/document'
import handlePNG from 'utils/png'
import { RouterProps } from 'utils/props'
import handleSupabase from 'utils/supabase'
import { ValueType } from 'utils/value'
import calcRankingValues from 'utils/value/modules/calcRankingValues'

// import saveRankingDB from './modules/rankingDB'

export async function actionSavePrefectureRanking(
  title: string,
  routerProps: RouterProps,
  document: DocumentType
) {
  const rankingValues = formatRankingValues(document)

  return {
    // OGP画像を生成・保存
    savePrefectureRankOGP: async () => {
      // const { savePrefectureRankOGP } = handleOGP()
      const { savePrefectureRankOGP } = handleSupabase()
      await savePrefectureRankOGP(title, routerProps, rankingValues)
    },
    // supabaseにデータを保存
    // saveRankingDB: async () => {
    //   await saveRankingDB(routerProps, rankingValues)
    // },
    // ベスト5・ワースト5の画像を生成・保存
    saveBestWorstPNG: async () => {
      const { saveBestWorstPNG } = handlePNG()
      await saveBestWorstPNG(title, routerProps, rankingValues)
    },
    // 相関図の画像を生成・保存
    saveCorrelationPNG: async () => {
      const { saveCorrelationPNG } = handlePNG()
      await saveCorrelationPNG(title, routerProps, document)
    },
  }
}

function formatRankingValues(document: DocumentType): ValueType[] {
  const { times, values } = document
  const latestTime = times.sort(
    (a, b) => parseInt(b.timeCode) - parseInt(a.timeCode)
  )[0]

  const latestValues = values.filter((f) => f.timeCode === latestTime.timeCode)

  return calcRankingValues(latestValues)
}
