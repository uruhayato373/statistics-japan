import { useState } from 'react'

import CardMedia from '@mui/material/CardMedia'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

import MainCard from 'components/MainCard'

import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu'
import { ThemeDirection } from 'config'
import useConfig from 'hooks/useConfig'

const defaultLayout = '/assets/images/customization/default.svg'
const rtlLayout = '/assets/images/customization/rtl.svg'
const miniMenu = '/assets/images/customization/mini-menu.svg'

export default function ThemeLayout() {
  const theme = useTheme()
  const { menuMaster } = useGetMenuMaster()
  const drawerOpen = menuMaster.isDashboardDrawerOpened
  const downLG = useMediaQuery(theme.breakpoints.down('lg'))

  const { miniDrawer, themeDirection, onChangeDirection, onChangeMiniDrawer } =
    useConfig()

  let initialTheme = 'default'
  if (miniDrawer === true) initialTheme = 'mini'
  if (themeDirection === ThemeDirection.RTL) initialTheme = 'rtl'

  const [value, setValue] = useState(initialTheme)
  const handleRadioChange = (event) => {
    const newValue = event.target.value
    setValue(newValue)
    if (newValue === 'default') {
      if (themeDirection === ThemeDirection.RTL) {
        onChangeDirection(ThemeDirection.LTR)
      }
      if (miniDrawer === true) {
        onChangeMiniDrawer(false)
      }
      if (!drawerOpen) {
        handlerDrawerOpen(true)
      }
    }
    if (newValue === 'mini') {
      onChangeMiniDrawer(true)
      if (drawerOpen) {
        handlerDrawerOpen(false)
      }
    }
    if (newValue === ThemeDirection.RTL) {
      onChangeDirection(ThemeDirection.RTL)
    }
  }

  return (
    <RadioGroup
      row
      aria-label="payment-card"
      name="payment-card"
      value={value}
      onChange={handleRadioChange}
    >
      <Grid container spacing={1.75} sx={{ ml: 0 }}>
        <Grid item>
          <FormControlLabel
            value="default"
            control={<Radio value="default" sx={{ display: 'none' }} />}
            sx={{
              display: 'flex',
              '& .MuiFormControlLabel-label': { flex: 1 },
            }}
            label={
              <MainCard
                content={false}
                sx={{
                  bgcolor:
                    value === 'default'
                      ? 'primary.lighter'
                      : 'secondary.lighter',
                  p: 1,
                }}
                border={false}
                {...(value === 'default' && {
                  boxShadow: true,
                  shadow: theme.customShadows.primary,
                })}
              >
                <Stack spacing={1.25} alignItems="center">
                  <CardMedia
                    component="img"
                    src={defaultLayout}
                    alt="Vertical"
                    sx={{ borderRadius: 1, width: 64, height: 64 }}
                  />
                  <Typography variant="caption">Default</Typography>
                </Stack>
              </MainCard>
            }
          />
        </Grid>

        {downLG ? (
          <Grid item>
            <FormControlLabel
              value="mini"
              control={<Radio value="mini" sx={{ display: 'none' }} />}
              sx={{
                display: 'flex',
                '& .MuiFormControlLabel-label': { flex: 1 },
              }}
              label={
                <MainCard
                  content={false}
                  sx={{
                    bgcolor:
                      value === 'mini'
                        ? 'primary.lighter'
                        : 'secondary.lighter',
                    p: 1,
                  }}
                  border={false}
                  {...(value === 'mini' && {
                    boxShadow: true,
                    shadow: theme.customShadows.primary,
                  })}
                >
                  <Stack spacing={1.25} alignItems="center">
                    <CardMedia
                      component="img"
                      src={miniMenu}
                      alt="Vertical"
                      sx={{ borderRadius: 1, width: 64, height: 64 }}
                    />
                    <Typography variant="caption">Mini Drawer</Typography>
                  </Stack>
                </MainCard>
              }
            />
          </Grid>
        ) : null}

        <Grid item>
          <FormControlLabel
            value={ThemeDirection.RTL}
            control={
              <Radio value={ThemeDirection.RTL} sx={{ display: 'none' }} />
            }
            sx={{
              display: 'flex',
              '& .MuiFormControlLabel-label': { flex: 1 },
            }}
            label={
              <MainCard
                content={false}
                sx={{
                  bgcolor:
                    value === ThemeDirection.RTL
                      ? 'primary.lighter'
                      : 'secondary.lighter',
                  p: 1,
                }}
                border={false}
                {...(value === ThemeDirection.RTL && {
                  boxShadow: true,
                  shadow: theme.customShadows.primary,
                })}
              >
                <Stack spacing={1.25} alignItems="center">
                  <CardMedia
                    component="img"
                    src={rtlLayout}
                    alt="Vertical"
                    sx={{ borderRadius: 1, width: 64, height: 64 }}
                  />
                  <Typography variant="caption">RTL</Typography>
                </Stack>
              </MainCard>
            }
          />
        </Grid>
      </Grid>
    </RadioGroup>
  )
}
