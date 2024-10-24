import { RouterPropsType } from 'types/apps'
import { DocumentType } from 'utils/document'
import { ValueType } from 'utils/value'
import calcRankingValues from 'utils/value/modules/calcRankingValues'

import saveCorrelationPNG from './modules/saveCorrelationPNG'
import saveJapanPNG from './modules/saveJapanPNG'
import saveRankingPNG from './modules/saveRankingPNG'

function formatRankingValues(document: DocumentType): ValueType[] {
  const { times, values } = document
  const latestTime = times.sort(
    (a, b) => parseInt(b.timeCode) - parseInt(a.timeCode)
  )[0]

  const latestValues = values.filter((f) => f.timeCode === latestTime.timeCode)

  return calcRankingValues(latestValues)
}

const handlePNG = (
  title: string,
  routerProps: RouterPropsType,
  document: DocumentType
) => {
  // 遅延評価のために、値を計算する関数を定義
  const getValues = () => formatRankingValues(document)

  return {
    saveRankingPNG: async () => {
      const values = getValues() // ここで実際に計算を行う
      await saveRankingPNG(title, routerProps, values)
    },
    saveCorrelationPNG: async () =>
      await saveCorrelationPNG(title, routerProps, document),
    saveJapanPNG: async () => await saveJapanPNG(title, routerProps, document),
  }
}

export default handlePNG
