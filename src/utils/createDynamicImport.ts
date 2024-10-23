import { ComponentType } from 'react'

import dynamic from 'next/dynamic'

import { ViewsPropsType } from 'types/views'
import { toPascalCase } from 'utils/toPascalCase'

import { RouterProps } from './props'

export const createDynamicImport = (
  { fieldId, menuId, kindId }: RouterProps,
  name: string
): ComponentType<ViewsPropsType> =>
  dynamic(
    () => import(`views/${fieldId}/${menuId}/${kindId}/${toPascalCase(name)}`),
    { suspense: true }
  ) as ComponentType<ViewsPropsType>
