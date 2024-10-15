import { Suspense } from 'react'

import { Metadata } from 'next'

import Analytics from 'components/Analytics'

import PropTypes from 'prop-types'

import { GA_MEASUREMENT_ID } from 'libs/gtag'

import './globals.css'

import ProviderWrapper from './ProviderWrapper'

export const metadata: Metadata = {
  title: '統計で見る都道府県',
  description:
    '都道府県に関する様々な統計をビジュアライズ化します。あなたの街の統計を見てみましょう。',
  verification: {
    google: '280OS5AQFAPj4f0U4MBLC2QOXi7pPmrBe2Vka5__2W4',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        {/* Google Search Console スクリプト */}
        {/* <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        ></script> */}
        {/* Google Analytics スクリプト */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        ></script>
        {/* Google AdSense スクリプト */}
        {/* <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7995274743017484"
          crossOrigin="anonymous"
        ></script> */}
      </head>
      <Suspense fallback={<></>}>
        <Analytics />
      </Suspense>
      <body>
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  )
}

RootLayout.propTypes = { children: PropTypes.node }
