import { RouterPropsType } from 'types/apps'

import generateBreadcrumbsProps from './breadcrumbsProps'
import generateMetaProps from './metaProps'

function camelToKebabCase(str: string): string {
  return str
    .replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
    .replace(/^-/, '')
}

const handleProps = ({
  fieldId,
  menuId,
  kindId,
  pageId,
  prefCode,
}: RouterPropsType) => {
  const routerProps = {
    fieldId,
    menuId,
    kindId,
    pageId: pageId,
    prefCode: prefCode,
  }
  return {
    routerProps,
    cardProps: (cardId: string, pageId?: string) => ({
      ...routerProps,
      cardId: camelToKebabCase(cardId),
      pageId: pageId,
    }),
    metaProps: async () => generateMetaProps(routerProps),
    breadcrumbsProps: async () => generateBreadcrumbsProps(routerProps),
  }
}

export default handleProps
