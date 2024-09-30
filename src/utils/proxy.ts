import type { Agent } from 'http'

import { HttpsProxyAgent } from 'https-proxy-agent'

const PROXY_URL = process.env.HTTP_PROXY
const USE_PROXY = process.env.USE_PROXY === 'true'

let globalAgent: Agent | undefined

function getProxyAgent(): Agent | undefined {
  if (USE_PROXY && PROXY_URL) {
    if (!globalAgent) {
      console.log('Initializing proxy agent with URL:', PROXY_URL)
      globalAgent = new HttpsProxyAgent(PROXY_URL)
    }
    return globalAgent
  }
  if (!USE_PROXY) {
    console.log('Proxy is disabled')
  }
  return undefined
}

export { getProxyAgent }
