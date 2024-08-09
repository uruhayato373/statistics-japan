import CardsLineSelectPrefecture from 'cards/CardsLineSelectPrefecture'
import CardsPrefectureRankingChart from 'cards/CardsPrefectureRankingChart'
import CardsPrefectureRankingTable from 'cards/CardsPrefectureRankingTable'

import handleEstatAPI from 'utils/e-stat'

/**
 * e-Stat APIのパラメータを生成する関数
 */
const params = {
  statsDataId: '0000010102',
  cdCat01: 'B1101',
}

interface Props {
  searchParams: { timeCode?: string }
}

/**
 * 都道府県ランキングの各コンポーネントを返却する
 *
 * @description
 * routerPropsに応じて取得したparamsを元に、コンポーネントを返却する。
 * Gridレイアウトは親コンポーネントで設定する。
 */
export default async function PrefRankTotalArea({ searchParams }: Props) {
  const { times } = await handleEstatAPI(params).fetchDocument()

  const sortedTimes = times.sort(
    (a, b) => parseInt(b.timeCode) - parseInt(a.timeCode)
  )

  const selectedTimeCode = searchParams.timeCode
    ? searchParams.timeCode
    : sortedTimes[0].timeCode

  const document = await handleEstatAPI({
    ...params,
    cdTime: `${selectedTimeCode}100000`,
  }).fetchDocument()

  return {
    /**
     * 都道府県ランキングのChart
     */
    chart: <CardsPrefectureRankingChart document={document} times={times} />,
    /**
     * 都道府県ランキングのTable
     */
    table: <CardsPrefectureRankingTable document={document} times={times} />,
    /**
     * 選択した都道府県のLineChart
     */
    selectPrefecture: <CardsLineSelectPrefecture params={params} />,
  }
}
