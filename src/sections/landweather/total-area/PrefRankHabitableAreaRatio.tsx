import CardsLineSelectPrefecture from 'cards/CardsLineSelectPrefecture'

import CardsEstatPrefRankChartMultiParams from 'cards-estat/CardsEstatPrefRankChartMultiParams'
import CardsEstatPrefRankTableMultiParams from 'cards-estat/CardsEstatPrefRankTableMultiParams'

/**
 * 可住地面積
 */
const habitableArea = {
  statsDataId: '0000010102',
  cdCat01: 'B1103',
}

/**
 * 総面積
 */
const totalArea = {
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
export default async function PrefRankHabitableAreaRatio() {
  return {
    /**
     * 都道府県ランキングのChart
     */
    chart: (
      <CardsEstatPrefRankChartMultiParams params={[habitableArea, totalArea]} />
    ),
    /**
     * 都道府県ランキングのTable
     */
    table: (
      <CardsEstatPrefRankTableMultiParams params={[habitableArea, totalArea]} />
    ),
    /**
     * 選択した都道府県のLineChart
     */
    selectPrefecture: <CardsLineSelectPrefecture params={habitableArea} />,
  }
}
