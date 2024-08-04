import { useState } from 'react'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

import { FieldType } from 'utils/field'

type Props = {
  fields: FieldType[]
  currentField: FieldType
}

function BreadcrumbsField({ fields, currentField }: Props) {
  const [selectedItem, setSelectedItem] = useState<FieldType>(currentField)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event: { currentTarget: unknown }) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSelect = (item: FieldType) => {
    setSelectedItem(item)
    handleClose()
  }

  return (
    <>
      <Typography
        variant={'subtitle1'}
        sx={{
          textDecoration: 'none',
        }}
        color={'text.secondary'}
        onClick={handleClick}
      >
        {selectedItem.fieldTitle}
      </Typography>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {fields.map((item) => (
          <MenuItem key={item.fieldId} onClick={() => handleSelect(item)}>
            {item.fieldTitle}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default BreadcrumbsField
