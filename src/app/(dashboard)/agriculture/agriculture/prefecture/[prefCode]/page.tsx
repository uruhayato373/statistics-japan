import { Metadata } from 'next'
import dynamic from 'next/dynamic'

import getEnvVariable from 'utils/getEnvVariable'
import handlePrefecture from 'utils/prefecture'
import handleProps from 'utils/props'

// Constants
const PROPS = {
  fieldId: 'agriculture',
  menuId: 'agriculture',
  kindId: 'prefecture',
}

const USE_SSG = getEnvVariable('USE_SSG')

// Dynamic route params interface
interface Params {
  prefCode: string
}

// Dynamic import
const Prefecture = dynamic(
  () => import('views/agriculture/agriculture/prefecture'),
  {
    suspense: true,
  }
)

// Metadata generation
export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const { prefCode } = params
  const { metaProps } = handleProps({ ...PROPS, prefCode })
  return metaProps()
}

// Conditional SSG
export const generateStaticParams = async () => {
  if (USE_SSG === 'true') {
    const prefectures = handlePrefecture().fetchItems()
    return prefectures.map((p) => ({
      prefCode: p.prefCode,
    }))
  }
  return []
}

// Disable dynamic routes only if SSG is true
export const dynamicParams = USE_SSG !== 'true'

// Page component
const Page = ({ params }: { params: Params }) => {
  const { prefCode } = params
  const { routerProps } = handleProps({ ...PROPS, prefCode })

  return <Prefecture routerProps={routerProps} />
}

export default Page
