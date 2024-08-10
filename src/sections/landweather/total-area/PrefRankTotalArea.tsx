import CardsEstatPrefectureComparisonChart from 'cards-estat/CardsEstatPrefectureComparisonChart'
import CardsEstatPrefectureRankingChart from 'cards-estat/CardsEstatPrefectureRankingChart'
import CardsEstatPrefectureRankingTable from 'cards-estat/CardsEstatPrefectureRankingTable'
import handleEstatAPI from 'utils/e-stat'

/**
 * e-Stat APIのパラメータを生成する関数
 */
const params = {
  statsDataId: '0000010102',
  cdCat01: 'B1101',
}

interface Props {
  searchParams: { timeCode?: string; areaCode?: string | string[] }
}

/**
 * 都道府県ランキングの各コンポーネントを返却する
 *
 * @description
 * routerPropsに応じて取得したparamsを元に、コンポーネントを返却する。
 * Gridレイアウトは親コンポーネントで設定する。
 */
export default async function PrefRankTotalArea({ searchParams }: Props) {
  const areaCode = searchParams.areaCode

  const document = areaCode
    ? await handleEstatAPI({
        ...params,
        cdArea: areaCode,
      }).fetchDocument()
    : null

  console.log(document)

  return {
    /**
     * 都道府県ランキングのChart
     */
    chart: (
      <CardsEstatPrefectureRankingChart
        estatParams={params}
        searchParams={searchParams}
      />
    ),
    /**
     * 都道府県ランキングのTable
     */
    table: (
      <CardsEstatPrefectureRankingTable
        estatParams={params}
        searchParams={searchParams}
      />
    ),
    /**
     * 選択した都道府県のLineChart
     */
    selectPrefecture: (
      <CardsEstatPrefectureComparisonChart
        estatParams={params}
        searchParams={searchParams}
      />
    ),
  }
}
