import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsReactRankingTable from 'cards/CardsReactRankingTable'

import handleEstatAPI from 'utils/e-stat'

const TITLE = '総面積'

const ESTAT_PARAMS = {
  statsDataId: '0000010102',
  cdCat01: 'B1101',
}

export default async function RankingTableTotalArea() {
  const title = `都道府県の${TITLE}`

  const document = await handleEstatAPI(ESTAT_PARAMS).fetchDocument()

  const formatDocument = {
    ...document,
    categories: document.categories.map((d) => {
      return { ...d, categoryName: '総面積' }
    }),
    values: document.values.map((d) => {
      return { ...d, categoryName: '総面積' }
    }),
  }

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsReactRankingTable title={title} document={formatDocument} />
    </Suspense>
  )
}
