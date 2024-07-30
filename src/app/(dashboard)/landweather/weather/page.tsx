'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import Loader from 'components/Loader'

import useURL from 'hooks/useURL'

export default function Page() {
  const router = useRouter()
  const { currentKindURL } = useURL()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const url = currentKindURL()

    const redirectTimeout = setTimeout(() => {
      if (url) {
        router.push(url)
      }
    }, 100) // 少し遅延を入れてリダイレクトを開始

    const loadingTimeout = setTimeout(() => {
      setIsLoading(false)
    }, 1500) // 2秒後にローディングを終了

    return () => {
      clearTimeout(redirectTimeout)
      clearTimeout(loadingTimeout)
    }
  }, [router, currentKindURL])

  if (isLoading) {
    return <Loader /> // ローディング中はローダーを表示
  }

  // ページ遷移が完了した後に表示するコンテンツ
  // 通常は何も表示しない（新しいページにリダイレクトされるため）
  return null
}
