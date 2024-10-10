import { DocumentType } from 'utils/document'
import formatNumberJapanese from 'utils/value/modules/formatNumberJapanese'

interface HeaderType {
  label: string
  key: string
}

interface DataType {
  [key: string]: string
}

const HEADERS: HeaderType[] = [
  { label: '順位', key: 'rank' },
  { label: '都道府県', key: 'areaName' },
  { label: '値', key: 'value' },
  { label: '単位', key: 'unit' },
  { label: '偏差値', key: 'deviationValue' },
]

const formatRankingTable = (document: DocumentType) => {
  const { areas, values } = document

  const valueMap = new Map(values.map((value) => [value.areaCode, value]))

  const data: DataType[] = areas.map((area) => {
    const areaValues = valueMap.get(area.areaCode)

    return {
      rank: String(areaValues?.rank) ?? '',
      areaName: area.areaName,
      value: formatNumberJapanese(areaValues?.value) ?? '',
      unit: areaValues?.unit ?? '',
      deviationValue: String(areaValues?.deviationValue) ?? '',
    }
  })

  return { headers: HEADERS, data }
}

export default formatRankingTable
