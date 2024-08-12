import CardsEstatPrefectureComparisonChart from 'cards-estat/CardsEstatPrefectureComparisonChart'
import CardsEstatPrefectureRankingChart from 'cards-estat/CardsEstatPrefectureRankingChart'
import CardsEstatPrefectureRankingTable from 'cards-estat/CardsEstatPrefectureRankingTable'

const estatParams = {
  statsDataId: '0000010103',
  cdCat01: 'C3101',
}

interface Props {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function RankingAgriculturalOutput({ searchParams }: Props) {
  return {
    chart: (
      <CardsEstatPrefectureRankingChart
        title={'都道府県の農業産出額ランキング'}
        estatParams={estatParams}
        searchParams={searchParams}
      />
    ),
    table: (
      <CardsEstatPrefectureRankingTable
        title={'都道府県の農業産出額データ'}
        estatParams={estatParams}
        searchParams={searchParams}
      />
    ),
    comparison: (
      <CardsEstatPrefectureComparisonChart
        title={'都道府県の農業産出額を比較'}
        estatParams={estatParams}
        searchParams={searchParams}
      />
    ),
  }
}
