import { DocumentType } from 'utils/document'
import { RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'
import calcRankingValues from 'utils/value/modules/calcRankingValues'

import saveLocal from './modules/saveLocal'
import saveSupabase from './modules/saveSupabase'

function formatRankingValues(document: DocumentType): ValueType[] {
  const { times, values } = document
  const latestTime = times.sort(
    (a, b) => parseInt(b.timeCode) - parseInt(a.timeCode)
  )[0]

  const latestValues = values.filter((f) => f.timeCode === latestTime.timeCode)

  return calcRankingValues(latestValues)
}

const handleOGP = (
  title: string,
  routerProps: RouterProps,
  document?: DocumentType
) => {
  const values = document ? formatRankingValues(document) : undefined
  return {
    saveSupabase: async () => await saveSupabase(title, routerProps, values),
    saveLocal: async () => await saveLocal(title, routerProps, values),
  }
}

export default handleOGP
