import { MetadataRoute } from 'next'

import { handleMenu } from 'utils/menu'
import { handlePage } from 'utils/page'
import { handlePrefecture } from 'utils/prefecture'

const BASE_URL = 'https://statistics-japan.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { items } = handleMenu()
  const menus = items()

  const { fetchItems: fetchPrefecture } = handlePrefecture()
  const prefectures = await fetchPrefecture()

  const japanEntries = menus.map((menu) => ({
    url: `${BASE_URL}/${menu.fieldId}/${menu.menuId}/japan`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const prefectureRankEntries = menus
    .map((menu) => {
      const { items } = handlePage()
      const pages = items(menu.menuId)
      return pages.map((page) => ({
        url: `${BASE_URL}/${menu.fieldId}/${menu.menuId}/prefecture-rank/${page.pageId}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
    })
    .flat()

  const prefectureEntries = menus
    .map((menu) => {
      return prefectures.map((prefecture) => ({
        url: `${BASE_URL}/${menu.fieldId}/${menu.menuId}/prefecture/${prefecture.prefCode}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
    })
    .flat()

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about-site`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  return [
    ...staticEntries,
    ...japanEntries,
    ...prefectureRankEntries,
    ...prefectureEntries,
  ]
}
