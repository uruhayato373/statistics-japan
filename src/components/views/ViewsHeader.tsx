import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import SelectPage from 'components/SelectPage'
import SelectPrefecture from 'components/SelectPrefecture'

import handleOGP from 'utils/ogp'
import handleProps, { RouterProps } from 'utils/props'

interface Props {
  routerProps: RouterProps
}

const SAVE_OGP = process.env.SAVE_OGP

const ViewsHeader = async ({ routerProps }: Props) => {
  const breadcrumbsProps = await handleProps(routerProps).breadcrumbsProps()

  // OGP画像の保存
  if (SAVE_OGP === 'true') {
    const menuTitle = breadcrumbsProps.currentMenu.menuTitle
    if (routerProps.kindId !== 'prefecture-rank') {
      await handleOGP(menuTitle, routerProps).saveAWS()
    }
  }

  const { kindId } = routerProps

  const renderSelector = () => {
    switch (kindId) {
      case 'prefecture':
        return <SelectPrefecture />
      case 'prefecture-rank':
        return <SelectPage />
      default:
        return null
    }
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
        {renderSelector()}
      </Stack>
    </>
  )
}

export default ViewsHeader
