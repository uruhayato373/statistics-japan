import { useMemo } from 'react'

import { DocumentType, RankingDocumentType } from 'utils/document'

export function useTimeFilteredDocument(
  document: DocumentType | RankingDocumentType,
  selectedTimeCode: string
) {
  return useMemo(
    () => ({
      ...document,
      times: document.times.filter((t) => t.timeCode === selectedTimeCode),
      values: document.values.filter((f) => f.timeCode === selectedTimeCode),
    }),
    [document, selectedTimeCode]
  )
}
