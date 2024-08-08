import CardsLineSelectPrefecture from 'cards/CardsLineSelectPrefecture'
import CardsPrefRankChart from 'cards/CardsPrefRankChart'
import CardsPrefRankTable from 'cards/CardsPrefRankTable'

/**
 * e-Stat APIのパラメータを生成する関数
 */
const params = {
  statsDataId: '0000010102',
  cdCat01: 'B1101',
}

/**
 * 都道府県ランキングの各コンポーネントを返却する
 *
 * @description
 * routerPropsに応じて取得したparamsを元に、コンポーネントを返却する。
 * Gridレイアウトは親コンポーネントで設定する。
 */
export default async function PrefRankTotalPopulation() {
  return {
    /**
     * 都道府県ランキングのChart
     */
    chart: <CardsPrefRankChart params={params} />,
    /**
     * 都道府県ランキングのTable
     */
    table: <CardsPrefRankTable params={params} />,
    /**
     * 選択した都道府県のLineChart
     */
    selectPrefecture: <CardsLineSelectPrefecture params={params} />,
  }
}
