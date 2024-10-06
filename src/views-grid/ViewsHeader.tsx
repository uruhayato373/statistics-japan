import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import SelectPrefecture from 'components/SelectPrefecture'

import { actionSaveJapan } from 'actions/saveJapan'
import { actionSavePrefecture } from 'actions/savePrefecture'
import handleProps, { RouterProps } from 'utils/props'

interface Props {
  routerProps: RouterProps
}

const ViewsHeader = async ({ routerProps }: Props) => {
  const breadcrumbsProps = await handleProps(routerProps).breadcrumbsProps()
  const menuTitle = breadcrumbsProps.currentMenu.menuTitle

  if (routerProps.kindId === 'prefecture') {
    await actionSavePrefecture(menuTitle, routerProps)
  }

  if (routerProps.kindId === 'japan') {
    await actionSaveJapan(menuTitle, routerProps)
  }

  return (
    <>
      <Breadcrumbs custom icon breadcrumbsProps={breadcrumbsProps} />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 1, mb: 2.5 }}
      >
        <Typography variant="h2">{breadcrumbsProps.pageTitle}</Typography>
        <SelectPrefecture />
      </Stack>
    </>
  )
}

export default ViewsHeader
