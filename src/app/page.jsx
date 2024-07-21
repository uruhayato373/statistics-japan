'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    router.push('/population/total-population/prefecture/28000')
  }, [router])
  // return (
  //   <SimpleLayout>
  //     <Landing />
  //   </SimpleLayout>
  // );
}
