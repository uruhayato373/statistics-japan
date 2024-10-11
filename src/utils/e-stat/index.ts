import fetchDivisionValues from './modules/fetchDivisionValues'
import fetchRatioValues from './modules/fetchRatioValues'
import fetchResponses from './modules/fetchResponses'
import fetchValues from './modules/fetchValues'

export type * from './types/params'

const handleEstatAPI = () => {
  return {
    fetchResponses,
    fetchValues,
    fetchDivisionValues,
    fetchRatioValues,
  }
}

export default handleEstatAPI
