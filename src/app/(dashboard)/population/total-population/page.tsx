'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import Loader from 'components/Loader'

import useURL from 'hooks/useURL'

/**
 * リダイレクト処理を行うページコンポーネント
 * @returns {JSX.Element | null} ローディング中はLoader、それ以外はnull
 */
export default function Page(): JSX.Element | null {
  const router = useRouter()
  const { currentKindURL } = useURL()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const url = currentKindURL()

    // リダイレクト処理
    const redirectTimeout = setTimeout(() => {
      if (url) {
        router.push(url)
      }
    }, 100) // 少し遅延を入れてリダイレクトを開始

    // ローディング状態の管理
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false)
    }, 1500) // 1.5秒後にローディングを終了

    // クリーンアップ関数
    return () => {
      clearTimeout(redirectTimeout)
      clearTimeout(loadingTimeout)
    }
  }, [router, currentKindURL])

  // ローディング中はローダーを表示
  if (isLoading) {
    return <Loader />
  }

  // ページ遷移が完了した後は何も表示しない
  // （新しいページにリダイレクトされるため）
  return null
}
