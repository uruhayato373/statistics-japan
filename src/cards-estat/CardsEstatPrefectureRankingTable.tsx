import CardsPrefectureRankingTable from 'cards/CardsPrefectureRankingTable'

import handleEstatAPI, { EstatParamsType } from 'utils/e-stat'

interface Props {
  estatParams?: EstatParamsType
  searchParams?: { timeCode?: string }
}

/**
 * 一つのe-Stat APIからデータを取得し、都道府県ランキングのチャートを表示するコンポーネント
 *
 * @description
 * useEstatAPIとuseEstatAPIsのカスタムフックを条件分岐下で使用することができないため、
 * それぞれ別のコンポーネントとして実装している。
 */
export default async function CardsEstatPrefectureRankingTable({
  estatParams,
  searchParams,
}: Props) {
  const { times } = await handleEstatAPI(estatParams).fetchDocument()

  const sortedTimes = times.sort(
    (a, b) => parseInt(b.timeCode) - parseInt(a.timeCode)
  )

  const selectedTimeCode = searchParams.timeCode
    ? searchParams.timeCode
    : sortedTimes[0].timeCode

  const document = await handleEstatAPI({
    ...estatParams,
    cdTime: `${selectedTimeCode}100000`,
  }).fetchDocument()

  return <CardsPrefectureRankingTable document={document} times={times} />
}
