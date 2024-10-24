import { Metadata } from 'next'

import { handleKind } from 'utils/kind'
import { handleMenu } from 'utils/menu'
import handlePage from 'utils/page'
import handlePrefecture from 'utils/prefecture'

import generatePageTitle from './generateTitle'

import { RouterProps } from '.'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const S3_URL = 'https://stats47-ogp.s3.ap-northeast-1.amazonaws.com'

const generateMetaProps = async ({
  fieldId,
  menuId,
  kindId,
  pageId,
  prefCode,
}: RouterProps): Promise<Metadata> => {
  const currentMenu = handleMenu().findItem(menuId)
  const currentKind = handleKind().findItem(kindId)
  const currentPage = handlePage().findItem(pageId)
  const currentPrefecture = prefCode
    ? handlePrefecture().findItem(prefCode)
    : null

  const title = generatePageTitle({
    menu: currentMenu,
    kind: currentKind,
    page: currentPage,
    prefecture: currentPrefecture,
  })

  let description = ''
  let url = BASE_URL
  let ogImageUrl = `${S3_URL}/${fieldId}/${menuId}`
  switch (kindId) {
    case 'japan':
      url += `${fieldId}/${menuId}/japan`
      description += `日本の${currentMenu.menuTitle}をダッシュボード表示。様々な統計値をビジュアライズしています。データはCSV形式でダウンロードも可能。`
      ogImageUrl += '/japan/00000.png'
      break
    case 'prefecture-rank':
      url += `${fieldId}/${menuId}/prefecture-rank/${pageId}`
      description += `都道府県の${currentPage.pageTitle}をコロプレス地図でランキング表示。古い年度のデータも参照できます。データは全てCSV形式でダウンロードも可能。`
      ogImageUrl += `/prefecture-rank/${pageId}.png`
      break
    case 'prefecture':
      url += `${fieldId}/${menuId}/prefecture/${prefCode}`
      description += `${currentPrefecture.prefName}の${currentMenu.menuTitle}をダッシュボード表示。様々な統計値をビジュアライズしています。データはCSV形式でダウンロードも可能。`
      ogImageUrl += `/prefecture/${prefCode}.png`
      break
  }

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
      description,
      type: 'website',
      url,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${title} | 統計で見る都道府県`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | 統計で見る都道府県`,
      description,
      images: [ogImageUrl],
    },
  }
}

export default generateMetaProps
