import { useState, useEffect } from 'react'

export function useLoadingState(selectedTimeCode: string) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (selectedTimeCode) {
      setIsLoading(true)
      const timer = setTimeout(() => setIsLoading(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [selectedTimeCode])

  return isLoading
}
