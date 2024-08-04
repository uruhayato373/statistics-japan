'use client'

import { useEffect } from 'react'

import { usePathname, useSearchParams } from 'next/navigation'

import { pageview } from 'libs/gtag'

/**
 * ページビューを追跡するAnalyticsコンポーネント。
 * このコンポーネントは、Next.jsアプリケーションでGoogle Analyticsを使用してページビューを追跡します。
 *
 * @returns {null} このコンポーネントは表示可能なものをレンダリングしません。
 */
export default function Analytics(): null {
  // 現在のパス名を取得
  const pathname = usePathname()

  // 現在の検索パラメータを取得
  const searchParams = useSearchParams()

  useEffect(() => {
    // パス名が利用可能な場合のみページビューを追跡
    if (pathname) {
      // gtagライブラリからpageview関数を呼び出し
      pageview(pathname)
    }
  }, [pathname, searchParams]) // パス名または検索パラメータが変更されたときに効果を再実行

  // このコンポーネントは何もレンダリングしない
  return null
}
