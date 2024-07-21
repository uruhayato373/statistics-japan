import { MetadataRoute } from 'next'

import { handlePrefecture } from 'utils/prefecture'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://statistics-japan.com'

  const { fetchItems: fetchPrefecture } = handlePrefecture()
  const prefectures = await fetchPrefecture()

  // 人口・世帯のサイトマップを作成
  const populationEntries = prefectures.map((prefecture) => ({
    url: `${baseUrl}/population/total-population/${prefecture.prefCode}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // 静的なページのエントリ
  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about-site`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // 静的エントリと動的エントリを結合
  return [...staticEntries, ...populationEntries]
}
