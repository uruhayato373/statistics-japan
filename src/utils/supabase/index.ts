import { createClient } from '@supabase/supabase-js'

import getEnvVariable from 'utils/getEnvVariable'
import { RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

import loadValues from './modules/loadValues'
import saveOGP from './modules/saveOGP'
import saveValues from './modules/saveValues'

const supabaseUrl = getEnvVariable('NEXT_PUBLIC_SUPABASE_URL')
const supabaseAnonKey = getEnvVariable('NEXT_PUBLIC_SUPABASE_ANON_KEY')
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const handleSupabase = (routerProps: RouterProps) => {
  return {
    loadValues: async () => {
      return await loadValues(supabase, routerProps)
    },
    saveValues: async (values: ValueType[]) => {
      await saveValues(supabase, routerProps, values)
    },
    saveOGP: async (pngBuffer: Buffer) => {
      await saveOGP(supabase, routerProps, pngBuffer)
    },
  }
}

export default handleSupabase
