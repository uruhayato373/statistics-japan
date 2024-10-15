import { createClient } from '@supabase/supabase-js'

import getEnvVariable from 'utils/getEnvVariable'
import { RouterProps } from 'utils/props'

import loadValues from './modules/loadValues'
import saveOGP from './modules/saveOGP'

const supabaseUrl = getEnvVariable('NEXT_PUBLIC_SUPABASE_URL')
const supabaseAnonKey = getEnvVariable('NEXT_PUBLIC_SUPABASE_ANON_KEY')
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const generateFileName = (routerProps: RouterProps) => {
  const { fieldId, menuId, kindId, pageId, prefCode } = routerProps
  const fileName = prefCode ? `${prefCode}.png` : `${pageId}.png`
  return `${fieldId}/${menuId}/${kindId}/${fileName}`
}

const handleSupabase = (routerProps: RouterProps) => {
  const fileName = generateFileName(routerProps)
  return {
    loadValues,
    saveOGP: async (pngBuffer: Buffer): Promise<void> => {
      await saveOGP(supabase, fileName, pngBuffer)
    },
  }
}

export default handleSupabase
