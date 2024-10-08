import { ApexOptions } from 'apexcharts'
import { Options } from 'highcharts'

import { SectionsPropsType } from 'types/sections'
import { DocumentType } from 'utils/document'
import { ValueType } from 'utils/value'

interface MainSectionsPropsType extends SectionsPropsType {
  cardTitle: string
  processValues: (prefCode?: string) => Promise<ValueType[]>
  processDocument: (values: ValueType[]) => Promise<DocumentType>
  options?: Options | ApexOptions
  actionButton?: React.ReactNode
}

async function SectionsWrapper({
  routerProps,
  children,
  cardTitle,
  processValues,
  processDocument,
  options,
  actionButton,
}: MainSectionsPropsType) {
  const { prefCode, kindId } = routerProps

  let values: ValueType[] = []
  switch (kindId) {
    case 'japan':
      values = await processValues('00000')
      break
    case 'prefecture':
      values = await processValues(prefCode)
      break
    default:
      values = await processValues()
      break
  }

  const document = await processDocument(values)

  return <>{children({ title: cardTitle, document, options, actionButton })}</>
}

export default SectionsWrapper
