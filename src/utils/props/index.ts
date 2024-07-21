import generateBreadcrumbsProps from './breadcrumbsProps'
import generateMetaProps from './metaProps'

export interface RouterProps {
  fieldId: string
  menuId: string
  kindId: string
  pageId: string | null
  prefCode: string | null
  cityCode: string | null
}

const handleProps = ({
  fieldId,
  menuId,
  kindId,
  pageId,
  prefCode,
  cityCode,
}: RouterProps) => {
  const routerProps = {
    fieldId,
    menuId,
    kindId,
    pageId: pageId || null,
    prefCode: prefCode || null,
    cityCode: cityCode || null,
  }
  return {
    routerProps,
    metaProps: async () => generateMetaProps(routerProps),
    breadcrumbsProps: async () => generateBreadcrumbsProps(routerProps),
  }
}

export default handleProps
