import Typography from '@mui/material/Typography'

import { FieldType } from 'utils/field'

type Props = {
  currentField: FieldType
}

function BreadcrumbsField({ currentField }: Props) {
  return (
    <>
      <Typography
        variant={'subtitle1'}
        sx={{
          textDecoration: 'none',
        }}
        color={'text.secondary'}
      >
        {currentField.fieldTitle}
      </Typography>
    </>
  )
}

export default BreadcrumbsField
