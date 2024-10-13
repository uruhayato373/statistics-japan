'use client'

import { Suspense, useMemo, useCallback } from 'react'

import dynamic from 'next/dynamic'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

import CircularProgressCards from 'components/CircularProgressCards'
import MainCard from 'components/MainCard'
import SelectTime from 'components/SelectTime'
import { CSVExport } from 'components/third-party/react-table'

import { useLoadingState } from 'hooks/useLoadingState'
import { useTimeFilteredDocument } from 'hooks/useTimeFilteredDocument'
import { CardsPropsType } from 'types/cards'
import formatCSV from 'utils/csv'
import { DocumentType } from 'utils/document'

import Control from './Control'
import Header from './Header'

// 動的インポートを使用してTableを遅延ロード
const Table = dynamic(() => import('./Table'), {
  loading: () => <CircularProgressCards />,
})

const useCSVData = (document: DocumentType, title?: string) => {
  return useMemo(() => {
    const { headers, data } = formatCSV(document).RankingTable()
    const filename = `${title}.csv`
    return { headers, data, filename }
  }, [document, title])
}

const TableContent = ({
  document,
  isLoading,
  height,
}: {
  document: DocumentType
  isLoading: boolean
  height: string
}) => (
  <Box sx={{ p: 2, overflow: 'auto', height }}>
    {isLoading ? <CircularProgressCards /> : <Table document={document} />}
  </Box>
)

export default function CardsReactPrefectureRankingTable({
  title,
  document,
  height = '450px',
}: CardsPropsType) {
  const { times } = document
  const [selectedTimeCode, SelectTimeComponent] = SelectTime({ times })

  const isLoading = useLoadingState(selectedTimeCode)
  const filteredDocument = useTimeFilteredDocument(
    document,
    selectedTimeCode
  ) as DocumentType

  const { headers, data, filename } = useCSVData(document, title)
  const csvButton = useMemo(
    () => <CSVExport data={data} headers={headers} filename={filename} />,
    [data, headers, filename]
  )

  const memoizedTableContent = useCallback(
    () => (
      <TableContent
        document={filteredDocument}
        isLoading={isLoading}
        height={height}
      />
    ),
    [filteredDocument, isLoading, height]
  )

  if (!selectedTimeCode) return null

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <MainCard sx={{ mt: 1 }} content={false}>
        <Header title={title} csvButton={csvButton} />
        <Divider sx={{ mt: 1.5, mb: 1.5 }} />
        <Control SelectTimeComponent={SelectTimeComponent} />
        {memoizedTableContent()}
      </MainCard>
    </Suspense>
  )
}
