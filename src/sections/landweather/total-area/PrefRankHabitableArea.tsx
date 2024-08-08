import CardsApexScatter from 'cards/CardsApexScatter'
import CardsLineSelectPrefecture from 'cards/CardsLineSelectPrefecture'
import CardsPrefRankChart from 'cards/CardsPrefRankChart'
import CardsPrefRankTable from 'cards/CardsPrefRankTable'

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
export default async function PrefRankHabitableArea() {
  return {
    /**
     * 都道府県ランキングのChart
     */
    chart: <CardsPrefRankChart params={habitableArea} />,
    /**
     * 都道府県ランキングのTable
     */
    table: <CardsPrefRankTable params={habitableArea} />,
    /**
     * 選択した都道府県のLineChart
     */
    selectPrefecture: <CardsLineSelectPrefecture params={habitableArea} />,
    /**
     * 可住地面積と総面積の散布図
     */
    scatterTotalArea: (
      <CardsApexScatter
        title={'可住地面積と総面積の相関関係'}
        xparams={totalArea}
        yparams={habitableArea}
        excludedAreaCode={['01000']}
      />
    ),
  }
}
