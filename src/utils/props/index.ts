import generateBreadcrumbsProps from './breadcrumbsProps'
import generateMetaProps from './metaProps'

export interface RouterProps {
  fieldId: string
  menuId: string
  kindId: string
  pageId?: string
  prefCode?: string
  cityCode?: string
}
export interface CardProps extends RouterProps {
  cardId: string
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
    pageId: pageId,
    prefCode: prefCode,
    cityCode: cityCode,
  }
  return {
    routerProps,
    cardProps: (cardId: string) => ({ ...routerProps, cardId }),
    metaProps: async () => generateMetaProps(routerProps),
    breadcrumbsProps: async () => generateBreadcrumbsProps(routerProps),
  }
}

export default handleProps
