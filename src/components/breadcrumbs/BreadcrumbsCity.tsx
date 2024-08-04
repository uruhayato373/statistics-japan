import { useState } from 'react'

import { useRouter } from 'next/navigation'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

import useURL from 'hooks/useURL'
import { CityType } from 'utils/city'

/**
 * BreadcrumbsCityコンポーネントのプロパティ型定義
 */
type BreadcrumbsCityProps = {
  cities: CityType[]
  currentCity: CityType
}

/**
 * 都市選択用のドロップダウンメニューを持つパンくずリストコンポーネント
 *
 * @param cities - 選択可能な都市のリスト
 * @param currentCity - 現在選択されている都市
 */
function BreadcrumbsCity({ cities, currentCity }: BreadcrumbsCityProps) {
  // 選択された都市の状態
  const [selectedCity, setSelectedCity] = useState<CityType>(currentCity)
  // メニューのアンカー要素の状態
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const { changeCityURL } = useURL()
  const router = useRouter()

  /**
   * メニューを開く処理
   */
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  /**
   * メニューを閉じる処理
   */
  const handleClose = () => {
    setAnchorEl(null)
  }

  /**
   * 都市選択時の処理
   * @param city - 選択された都市
   */
  const handleSelect = (city: CityType) => {
    setSelectedCity(city)
    const url = changeCityURL(city.cityCode)
    router.push(url)
    handleClose()
  }

  return (
    <>
      {/* 選択された都市名を表示 */}
      <Typography
        variant={'subtitle1'}
        sx={{
          textDecoration: 'none',
          cursor: 'pointer', // ポインターカーソルを追加して、クリック可能であることを示す
        }}
        color={'text.secondary'}
        onClick={handleClick}
      >
        {selectedCity.cityName}
      </Typography>

      {/* 都市選択メニュー */}
      <Menu
        id="city-selection-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {cities.map((city) => (
          <MenuItem key={city.cityCode} onClick={() => handleSelect(city)}>
            {city.cityName}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default BreadcrumbsCity
