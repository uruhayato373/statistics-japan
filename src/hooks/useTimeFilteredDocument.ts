import { useMemo } from 'react'

import { DocumentType } from 'utils/document'

export function useTimeFilteredDocument(
  document: DocumentType | DocumentType,
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
