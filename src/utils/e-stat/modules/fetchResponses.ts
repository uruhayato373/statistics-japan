import { EstatParamsType } from '../types/params'

import { fetchEstatAPI } from './fetchAPI'

/**
 * responseをそのまま返却する
 */
const fetchResponses = async (estatParams: EstatParamsType) => {
  if (Array.isArray(estatParams)) {
    const responses = await Promise.all(estatParams.map(fetchEstatAPI))
    return responses
  } else {
    const response = await fetchEstatAPI(estatParams)
    return response
  }
}

export default fetchResponses
