import dynamic from 'next/dynamic'

import CircularProgressCards from 'components/CircularProgressCards'

import { Options } from 'highcharts'

import { DocumentType } from 'utils/document'

const PrefectureRankingMapChart = dynamic(
  () => import('./PrefectureRankingMapChart'),
  {
    loading: () => <CircularProgressCards />,
    ssr: false,
  }
)

const PrefectureRankingBarChart = dynamic(
  () => import('./PrefectureRankingBarChart'),
  {
    loading: () => <CircularProgressCards />,
    ssr: false,
  }
)

interface Props {
  chartType: string
  filteredDocument: DocumentType
  options?: Options
}

const Chart = ({ chartType, filteredDocument, options }: Props) => (
  <>
    {chartType === 'map' ? (
      <PrefectureRankingMapChart
        document={filteredDocument}
        options={options}
      />
    ) : (
      <PrefectureRankingBarChart document={filteredDocument} />
    )}
  </>
)

export default Chart
