import CardsEstatPrefectureComparisonChart from 'cards-estat/CardsEstatPrefectureComparisonChart'
import CardsEstatPrefectureRankingChart from 'cards-estat/CardsEstatPrefectureRankingChart'
import CardsEstatPrefectureRankingTable from 'cards-estat/CardsEstatPrefectureRankingTable'

const estatParams = {
  statsDataId: '0000010102',
  cdCat01: 'B1101',
}

const customCategories = [
  {
    categoryCode: 'B1101',
    categoryName: '総面積',
    categoryUnit: 'ha',
  },
]

interface Props {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function RankingTotalArea({ searchParams }: Props) {
  return {
    chart: (
      <CardsEstatPrefectureRankingChart
        estatParams={estatParams}
        searchParams={searchParams}
        customCategories={customCategories}
      />
    ),
    table: (
      <CardsEstatPrefectureRankingTable
        estatParams={estatParams}
        searchParams={searchParams}
        customCategories={customCategories}
      />
    ),
    comparison: (
      <CardsEstatPrefectureComparisonChart
        estatParams={estatParams}
        searchParams={searchParams}
      />
    ),
  }
}
