import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import SelectPrefecture from 'components/SelectPrefecture'

import handleProps, { RouterProps } from 'utils/props'

interface Props {
  routerProps: RouterProps
}

const ViewsHeader = async ({ routerProps }: Props) => {
  const breadcrumbsProps = await handleProps(routerProps).breadcrumbsProps()
  const title = breadcrumbsProps.pageTitle

  return (
    <>
      <Breadcrumbs custom icon breadcrumbsProps={breadcrumbsProps} />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 1, mb: 2.5 }}
      >
        <Typography variant="h2">{title}</Typography>
        <SelectPrefecture />
      </Stack>
    </>
  )
}

export default ViewsHeader
