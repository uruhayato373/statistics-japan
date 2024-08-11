import CardsEstatPrefectureComparisonChart from 'cards-estat/CardsEstatPrefectureComparisonChart'
import CardsEstatPrefectureRankingChart from 'cards-estat/CardsEstatPrefectureRankingChart'
import CardsEstatPrefectureRankingTable from 'cards-estat/CardsEstatPrefectureRankingTable'

const estatParams = {
  statsDataId: '0000010102',
  cdCat01: 'B4106',
}

interface Props {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function RankingRainyDays({ searchParams }: Props) {
  return {
    chart: (
      <CardsEstatPrefectureRankingChart
        title={'都道府県の降雨日数ランキング'}
        estatParams={estatParams}
        searchParams={searchParams}
      />
    ),
    table: (
      <CardsEstatPrefectureRankingTable
        title={'都道府県の降雨日数データ'}
        estatParams={estatParams}
        searchParams={searchParams}
      />
    ),
    comparison: (
      <CardsEstatPrefectureComparisonChart
        title={'都道府県の降雨日数を比較'}
        estatParams={estatParams}
        searchParams={searchParams}
      />
    ),
  }
}
