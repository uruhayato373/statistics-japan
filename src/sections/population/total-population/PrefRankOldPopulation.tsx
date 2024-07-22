import CardsLineSelectPrefecture from 'cards/CardsLineSelectPrefecture'
import CardsPrefRankChart from 'cards/CardsPrefRankChart'
import CardsPrefRankTable from 'cards/CardsPrefRankTable'

import { RouterProps } from 'utils/props'

interface Props {
  routerProps: RouterProps
}

/**
 * e-Stat APIのパラメータを生成する関数
 */
const params = (routerProps: RouterProps) => {
  switch (routerProps.kindId) {
    case 'prefecture-rank':
      return {
        statsDataId: '0000010101',
        cdCat01: 'A1303',
      }
  }
}

/**
 * 都道府県ランキングの各コンポーネントを返却する
 *
 * @description
 * routerPropsに応じて取得したparamsを元に、コンポーネントを返却する。
 * Gridレイアウトは親コンポーネントで設定する。
 */
export default async function PrefRankTotalPopulation({ routerProps }: Props) {
  return {
    /**
     * 都道府県ランキングのChart
     */
    chart: <CardsPrefRankChart params={params(routerProps)} />,
    /**
     * 都道府県ランキングのTable
     */
    table: <CardsPrefRankTable params={params(routerProps)} />,
    /**
     * 選択した都道府県のLineChart
     */
    selectPrefecture: (
      <CardsLineSelectPrefecture params={params(routerProps)} />
    ),
  }
}
