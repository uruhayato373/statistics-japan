import useSWR, { SWRResponse } from 'swr'

import fetcher from 'utils/fetcher'
import { TopoJSONData } from 'utils/geoshape'

interface GeoshapeResponse {
  geoShape: TopoJSONData | undefined
  isLoading: boolean
  isError: Error | undefined
}

export default function useGeoshape(): GeoshapeResponse {
  // type: 'prefecture' | 'city' = 'prefecture',
  // prefCode?: string
  // const geoURL = handleGeoshape(type).apiURL(prefCode)
  const url =
    'https://geoshape.ex.nii.ac.jp/city/topojson/20230101/jp_pref.l.topojson'
  const { data, error }: SWRResponse<TopoJSONData, Error> = useSWR(
    url,
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
