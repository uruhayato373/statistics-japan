'use client'

import { Suspense, useMemo } from 'react'

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
import { RankingDocumentType } from 'utils/document'

import Control from './Control'
import Header from './Header'
import Table from './Table'

const useCSVData = (document: RankingDocumentType, title?: string) => {
  return useMemo(() => {
    const { headers, data } = formatCSV(document).RankingTable()
    const filename = `${title}.csv`
    return { headers, data, filename }
  }, [document, title])
}

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
  ) as RankingDocumentType
  const { headers, data, filename } = useCSVData(document, title)
  const csvButton = useMemo(
    () => <CSVExport data={data} headers={headers} filename={filename} />,
    [data, headers, filename]
  )

  if (!selectedTimeCode) return null

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <MainCard sx={{ mt: 1 }} content={false}>
        <Header title={title} csvButton={csvButton} />
        <Divider sx={{ mt: 1.5, mb: 1.5 }} />
        <Control SelectTimeComponent={SelectTimeComponent} />
        <Box sx={{ p: 2, overflow: 'auto', height: height }}>
          {isLoading ? (
            <CircularProgressCards />
          ) : (
            <Table document={filteredDocument} />
          )}
        </Box>
      </MainCard>
    </Suspense>
  )
}
