// import CardsApexScatter from 'cards/CardsApexScatter'

import CardsEstatPrefectureComparisonChart from 'cards-estat/CardsEstatPrefectureComparisonChart'
import CardsEstatPrefectureRankingChart from 'cards-estat/CardsEstatPrefectureRankingChart'
import CardsEstatPrefectureRankingTable from 'cards-estat/CardsEstatPrefectureRankingTable'

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
// const totalArea = {
//   statsDataId: '0000010102',
//   cdCat01: 'B1101',
// }

interface Props {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function RankingHabitableArea({ searchParams }: Props) {
  return {
    chart: (
      <CardsEstatPrefectureRankingChart
        title={'都道府県の可住地面積ランキング'}
        estatParams={habitableArea}
        searchParams={searchParams}
        // customCategories={customCategories}
      />
    ),
    table: (
      <CardsEstatPrefectureRankingTable
        title={'都道府県の可住地面積データ'}
        estatParams={habitableArea}
        searchParams={searchParams}
        // customCategories={customCategories}
      />
    ),
    comparison: (
      <CardsEstatPrefectureComparisonChart
        title={'都道府県の可住地面積を比較'}
        estatParams={habitableArea}
        searchParams={searchParams}
      />
    ),
    // scatterTotalArea: (
    //   <CardsApexScatter
    //     title={'可住地面積と総面積の相関関係'}
    //     xparams={totalArea}
    //     yparams={habitableArea}
    //     excludedAreaCode={['01000']}
    //   />
    // ),
  }
}
