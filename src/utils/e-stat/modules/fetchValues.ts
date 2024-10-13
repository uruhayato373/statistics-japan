import { EstatParamsType } from '../types/params'

import { fetchEstatAPI } from './fetchAPI'
import { formatValues } from './formatResponse/formatValues'

/**
 * valuesを取得して返却する
 */
const fetchValues = async (
  estatParams: EstatParamsType,
  categoryKey: string = 'cat01'
) => {
  if (Array.isArray(estatParams)) {
    const responses = await Promise.all(estatParams.map(fetchEstatAPI))
    const valuesArray = responses.map((response) =>
      formatValues(response, categoryKey)
    )
    return valuesArray.flat()
  } else {
    const response = await fetchEstatAPI(estatParams)
    const values = formatValues(response, categoryKey)
    return values
  }
}

export default fetchValues
