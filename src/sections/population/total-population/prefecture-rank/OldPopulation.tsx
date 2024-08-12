import CardsEstatPrefectureComparisonChart from 'cards-estat/CardsEstatPrefectureComparisonChart'
import CardsEstatPrefectureRankingChart from 'cards-estat/CardsEstatPrefectureRankingChart'
import CardsEstatPrefectureRankingTable from 'cards-estat/CardsEstatPrefectureRankingTable'

const estatParams = {
  statsDataId: '0000010101',
  cdCat01: 'A1303',
}

interface Props {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function RankingOldPopulation({ searchParams }: Props) {
  return {
    chart: (
      <CardsEstatPrefectureRankingChart
        title={'都道府県の老年人口ランキング'}
        estatParams={estatParams}
        searchParams={searchParams}
      />
    ),
    table: (
      <CardsEstatPrefectureRankingTable
        title={'都道府県の老年人口データ'}
        estatParams={estatParams}
        searchParams={searchParams}
      />
    ),
    comparison: (
      <CardsEstatPrefectureComparisonChart
        title={'都道府県の老年人口を比較'}
        estatParams={estatParams}
        searchParams={searchParams}
      />
    ),
  }
}
