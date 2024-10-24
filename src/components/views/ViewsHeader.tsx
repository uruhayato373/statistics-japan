import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import SelectPage from 'components/SelectPage'
import SelectPrefecture from 'components/SelectPrefecture'

import handleOGP from 'utils/ogp'
import handleProps from 'utils/props'

import { ViewsPropsType } from 'types/views'

const SAVE_OGP = process.env.SAVE_OGP

const ViewsHeader = async ({ routerProps }: ViewsPropsType) => {
  const breadcrumbsProps = await handleProps(routerProps).breadcrumbsProps()
  const { kindId } = routerProps

  // OGP画像の保存
  const saveOGP = async () => {
    if (SAVE_OGP === 'true') {
      const menuTitle = breadcrumbsProps.currentMenu.menuTitle
      if (kindId !== 'prefecture-rank') {
        await handleOGP(menuTitle, routerProps).saveAWS()
      }
    }
  }

  const renderSelector = () => {
    const selectorMap = {
      prefecture: <SelectPrefecture />,
      'prefecture-rank': <SelectPage />,
    }
    return selectorMap[kindId] || null
  }

  await saveOGP()

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
