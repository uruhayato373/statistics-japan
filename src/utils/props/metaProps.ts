import { Metadata } from 'next'

import { handleCity } from 'utils/city'
import { handleKind } from 'utils/kind'
import { handleMenu } from 'utils/menu'
// import { handlePage } from 'utils/page'
import { handlePrefecture } from 'utils/prefecture'

import generatePageTitle from './generateTitle'

import { RouterProps } from '.'

const generateMetaProps = async ({
  fieldId,
  menuId,
  kindId,
  pageId,
  prefCode,
  cityCode,
}: RouterProps): Promise<Metadata> => {
  const currentMenu = handleMenu().findItem(menuId)
  const currentKind = handleKind().findItem(kindId)
  const currentPrefecture = prefCode
    ? await handlePrefecture().findItem(prefCode)
    : null
  const currentCity =
    prefCode && cityCode ? await handleCity().findItem(cityCode) : null

  const title = generatePageTitle({
    menu: currentMenu,
    kind: currentKind,
    prefecture: currentPrefecture,
    city: currentCity,
  })

  const description = `${title}の統計ダッシュボード。地域の実態を数字で把握し、新たな発見と洞察を。あなたの意思決定をサポートします。`

  let url = 'https://statistics-japan.com/'
  switch (kindId) {
    case 'japan':
      url += `${fieldId}/${menuId}/japan`
      break
    case 'prefecture-rank':
      url += `${fieldId}/${menuId}/prefecture-rank/${pageId}`
      break
    case 'prefecture':
      url += `${fieldId}/${menuId}/prefecture/${prefCode}`
      break
    case 'city':
      url += `${fieldId}/${menuId}/city/${prefCode}/${cityCode}`
      break
  }

  const ogImageUrl = `https://statistics-japan.com/api/og?prefCode=${encodeURIComponent(prefCode)}&title=${encodeURIComponent(title)}`

  return {
    title: `${title} | 統計で見る都道府県`,
    description,
    authors: [{ name: 'uruhayato373', url: 'https://github.com/uruhayato373' }],
    metadataBase: new URL(url),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: `${title} | 統計で見る都道府県`,
      type: 'website',
      url,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}

export default generateMetaProps
