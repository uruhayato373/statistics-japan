import useSWR, { SWRResponse } from 'swr'

import fetcher from 'utils/fetcher'
import handleGeoshape, { TopoJSONData } from 'utils/geoshape'

interface GeoshapeResponse {
  geoShape: TopoJSONData | undefined
  isLoading: boolean
  isError: Error | undefined
}

export default function useGeoshape(
  type: 'prefecture' | 'city' = 'prefecture',
  prefCode?: string
): GeoshapeResponse {
  const geoURL = handleGeoshape(type).apiURL(prefCode)
  const { data, error }: SWRResponse<TopoJSONData, Error> = useSWR(
    geoURL,
    fetcher,
    {
      suspense: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
    }
  )

  return {
    geoShape: data,
    isLoading: !error && !data,
    isError: error,
  }
}
