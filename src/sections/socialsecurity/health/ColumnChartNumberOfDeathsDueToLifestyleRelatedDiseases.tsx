import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsApexColumnChart from 'cards/CardsApexColumnChart'

import { actionSaveValues } from 'actions/saveValues'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'
import handleProps, { CardProps, RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

const CARD_TITLE = '生活習慣病による死亡者数'
const CARD_ID = 'ColumnChartNumberOfDeathsDueToLifestyleRelatedDiseases'

const ESTAT_PARAMS = {
  statsDataId: '0000010109',
  cdCat01: ['I9101', 'I910101', 'I910102'],
}

interface Props {
  routerProps: RouterProps
  prefecture: PrefectureType
}

// values
async function processValues(cardProps: CardProps, prefCode: string) {
  const { fetchValues } = handleEstatAPI()
  const values = await fetchValues({ ...ESTAT_PARAMS, cdArea: prefCode })
  await actionSaveValues(cardProps, values)

  return values
}

// document
async function processDocument(values: ValueType[]): Promise<DocumentType> {
  const { formatDocument } = handleDocument()
  const document = formatDocument(values)

  document.categories = document.categories.map((d) => ({
    ...d,
    type: 'column',
  }))

  return document
}

// コンポーネントの描画
export default async function ColumnChartNumberOfDeathsDueToLifestyleRelatedDiseases({
  routerProps,
  prefecture,
}: Props) {
  const { prefCode, prefName } = prefecture
  const title = `${prefName}の${CARD_TITLE}`
  const cardProps = handleProps(routerProps).cardProps(CARD_ID)
  const values = await processValues(cardProps, prefCode)
  const document = await processDocument(values)

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsApexColumnChart title={title} document={document} />
    </Suspense>
  )
}

// <List
// component="nav"
// sx={{
//   p: 0,
//   '& .MuiListItemButton-root': {
//     py: 1.5,
//     '& .MuiAvatar-root': avatarSX,
//     '& .MuiListItemSecondaryAction-root': {
//       ...actionSX,
//       position: 'relative',
//     },
//   },
// }}
// >
// {series.map((item, index) => (
//   <ListItemButton key={index} divider>
//     <ListItemText
//       primary={
//         <Typography variant="subtitle1">{item.name}</Typography>
//       }
//       secondary={categories[categories.length - 1]}
//     />
//     <ListItemSecondaryAction>
//       <Stack alignItems="flex-end">
//         <Typography variant="subtitle1" noWrap>
//           {`${item.data[item.data.length - 1].toLocaleString()} ${item.unit}`}
//         </Typography>
//         {/* <Typography variant="h6" color="secondary" noWrap>
//           {item.rate}%
//         </Typography> */}
//       </Stack>
//     </ListItemSecondaryAction>
//   </ListItemButton>
// ))}
// </List>
