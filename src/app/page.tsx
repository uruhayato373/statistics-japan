import SimpleLayout from 'layout/SimpleLayout'
import Landing from 'views/landing'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

// メタデータ生成関数
export function generateMetadata() {
  return {
    title: `統計で見る都道府県`,
    description: 'test',
    authors: [{ name: 'uruhayato373', url: 'https://github.com/uruhayato373' }],
    // metadataBase: new URL(url),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: `統計で見る都道府県`,
      type: 'website',
      url: BASE_URL,
      images: [
        {
          url: `${BASE_URL}/ogp/opengraph-image.png`,
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}

export default function HomePage() {
  return (
    <SimpleLayout>
      <Landing />
    </SimpleLayout>
  )
}
