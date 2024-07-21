import { useState } from 'react'

import { useRouter } from 'next/navigation'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

import useURL from 'hooks/useURL'
import { CityType } from 'utils/city'

type Props = {
  cities: CityType[]
  currentCity: CityType
}

function BreadcrumbsCity({ cities, currentCity }: Props) {
  const [selectedItem, setSelectedItem] = useState<CityType>(currentCity)
  const [anchorEl, setAnchorEl] = useState(null)

  const { changeCityURL } = useURL()
  const router = useRouter()

  const handleClick = (event: { currentTarget: unknown }) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSelect = (item: CityType) => {
    setSelectedItem(item)
    const url = changeCityURL(item.cityCode)
    router.push(url)
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
        {selectedItem.cityName}
      </Typography>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {cities.map((item) => (
          <MenuItem key={item.cityCode} onClick={() => handleSelect(item)}>
            {item.cityName}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default BreadcrumbsCity
