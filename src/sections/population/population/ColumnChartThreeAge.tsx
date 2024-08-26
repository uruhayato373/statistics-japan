import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsApexColumnChart from 'cards/CardsApexColumnChart'

import { saveDocument } from 'app/actions/saveDocument'
import { saveValues } from 'app/actions/saveValues'
import handleDocument from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'
import { RouterProps } from 'utils/props'

const CARD_TITLE = '年齢3区分人口'
const CARD_ID = 'ColumnChartThreeAge'

const ESTAT_PARAMS = {
  statsDataId: '0000010101',
  cdCat01: ['A1301', 'A1302', 'A1303'],
}

interface Props {
  routerProps: RouterProps
  prefecture: PrefectureType
}

// valuesの取得と整形
async function fetchValues(prefCode: string) {
  const values = await handleEstatAPI().fetchValues({
    ...ESTAT_PARAMS,
    cdArea: prefCode,
  })

  return values
}

// コンポーネントの描画
export default async function ColumnChartThreeAge({
  routerProps,
  prefecture,
}: Props) {
  const { prefCode, prefName } = prefecture

  const title = `${prefName}の${CARD_TITLE}`

  const saveProps = { ...routerProps, cardId: CARD_ID }

  const values = await fetchValues(prefCode)
  if (process.env.NODE_ENV === 'development') {
    await saveValues(saveProps, values)
  }

  const document = handleDocument().formatDocument(values)
  if (process.env.NODE_ENV === 'development') {
    await saveDocument(saveProps, document)
  }

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
