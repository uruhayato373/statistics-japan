import { useState } from 'react'

import { useRouter } from 'next/navigation'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

import useURL from 'hooks/useURL'
import { PrefectureType } from 'utils/prefecture'

type Props = {
  prefectures: PrefectureType[]
  currentPrefecture: PrefectureType
}

function BreadcrumbsPrefecture({ prefectures, currentPrefecture }: Props) {
  const [selectedItem, setSelectedItem] =
    useState<PrefectureType>(currentPrefecture)
  const [anchorEl, setAnchorEl] = useState(null)

  const { changePrefURL } = useURL()
  const router = useRouter()

  const handleClick = (event: { currentTarget: unknown }) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSelect = (item: PrefectureType) => {
    setSelectedItem(item)
    const url = changePrefURL(item.prefCode)
    router.push(url)
    handleClose()
  }

  if (!prefectures || !currentPrefecture || !selectedItem) {
    return <div />
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
        {selectedItem.prefName}
      </Typography>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {prefectures.map((item) => (
          <MenuItem key={item.prefCode} onClick={() => handleSelect(item)}>
            {item.prefName}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default BreadcrumbsPrefecture
