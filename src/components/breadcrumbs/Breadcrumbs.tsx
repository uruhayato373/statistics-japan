/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
'use client'

import { useEffect, useState } from 'react'

import NextLink from 'next/link'
import { usePathname } from 'next/navigation'

import MuiBreadcrumbs from '@mui/material/Breadcrumbs'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import BreadcrumbsCity from 'components/breadcrumbs/BreadcrumbsCity'
import BreadcrumbsField from 'components/breadcrumbs/BreadcrumbsField'
import BreadcrumbsMenu from 'components/breadcrumbs/BreadcrumbsMenu'
import BreadcrumbsPage from 'components/breadcrumbs/BreadcrumbsPage'
import BreadcrumbsPrefecture from 'components/breadcrumbs/BreadcrumbsPrefecture'
import MainCard from 'components/MainCard'

import ApartmentOutlined from '@ant-design/icons/ApartmentOutlined'
import HomeFilled from '@ant-design/icons/HomeFilled'
import HomeOutlined from '@ant-design/icons/HomeOutlined'

import { ThemeDirection } from 'config'
import navigation from 'menu-items'
import { RouteProps } from 'utils/props'

type Props = {
  card?: boolean
  custom?: boolean
  divider?: boolean
  icon?: boolean
  icons?: boolean
  maxItems?: number
  breadcrumbsProps?: RouteProps
  rightAlign?: boolean
  separator?: unknown
  title?: boolean
  titleBottom?: boolean
  sx?: unknown
}

function Breadcrumbs({
  card = false,
  custom = false,
  divider = false,
  icon,
  icons,
  maxItems,
  breadcrumbsProps,
  rightAlign,
  separator,
  title = true,
  titleBottom = true,
  sx,
}: Props) {
  const theme = useTheme()
  const location = usePathname()
  const [main, setMain] = useState()
  const [item, setItem] = useState()

  const iconSX = {
    marginRight:
      theme.direction === ThemeDirection.RTL ? 0 : theme.spacing(0.75),
    marginLeft:
      theme.direction === ThemeDirection.RTL ? theme.spacing(0.75) : 0,
    width: '1rem',
    height: '1rem',
    color: theme.palette.secondary.main,
  }

  const customLocation = location

  useEffect(() => {
    navigation?.items?.map((menu) => {
      if (menu.type && menu.type === 'group') {
        if (menu?.url && menu.url === customLocation) {
          setMain(menu)
          setItem(menu)
        } else {
          getCollapse(menu)
        }
      }
      return false
    })
  })

  // set active item state
  const getCollapse = (menu) => {
    if (!custom && menu.children) {
      menu.children.filter((collapse) => {
        if (collapse.type && collapse.type === 'collapse') {
          getCollapse(collapse)
          if (collapse.url === customLocation) {
            setMain(collapse)
            setItem(collapse)
          }
        } else if (collapse.type && collapse.type === 'item') {
          if (customLocation === collapse.url) {
            setMain(menu)
            setItem(collapse)
          }
        }
        return false
      })
    }
  }

  // item separator
  const SeparatorIcon = separator
  const separatorIcon = separator ? (
    <SeparatorIcon style={{ fontSize: '0.75rem', marginTop: 2 }} />
  ) : (
    '/'
  )

  let mainContent
  let itemContent
  let breadcrumbContent = <Typography />
  let itemTitle = ''
  let CollapseIcon
  let ItemIcon

  // collapse item
  if (
    !custom &&
    main &&
    main.type === 'collapse' &&
    main.breadcrumbs === true
  ) {
    CollapseIcon = main.icon ? main.icon : ApartmentOutlined
    mainContent = (
      <NextLink href={main.url} passHref legacyBehavior>
        <Typography
          variant={window.location.pathname === main.url ? 'subtitle1' : 'h6'}
          sx={{ textDecoration: 'none', cursor: 'pointer' }}
          color={
            window.location.pathname === main.url
              ? 'text.primary'
              : 'text.secondary'
          }
        >
          {icons && <CollapseIcon style={iconSX} />}
          {main.title}
        </Typography>
      </NextLink>
    )

    breadcrumbContent = (
      <MainCard
        border={card}
        sx={
          card === false
            ? { mb: 3, bgcolor: 'inherit', backgroundImage: 'none', ...sx }
            : { mb: 3, ...sx }
        }
        content={card}
        shadow="none"
      >
        <Grid
          container
          direction={rightAlign ? 'row' : 'column'}
          justifyContent={rightAlign ? 'space-between' : 'flex-start'}
          alignItems={rightAlign ? 'center' : 'flex-start'}
          spacing={1}
        >
          <Grid item>
            <MuiBreadcrumbs
              aria-label="breadcrumb"
              maxItems={maxItems || 8}
              separator={separatorIcon}
            >
              <NextLink href="/" passHref legacyBehavior>
                <Typography
                  color="text.secondary"
                  variant="h6"
                  sx={{ textDecoration: 'none', cursor: 'pointer' }}
                >
                  {icons && <HomeOutlined style={iconSX} />}
                  {icon && !icons && (
                    <HomeFilled style={{ ...iconSX, marginRight: 0 }} />
                  )}
                  {(!icon || icons) && 'Home'}
                </Typography>
              </NextLink>
              {mainContent}
            </MuiBreadcrumbs>
          </Grid>
          {title && titleBottom && (
            <Grid item sx={{ mt: card === false ? 0.25 : 1 }}>
              <Typography variant="h2">{main.title}</Typography>
            </Grid>
          )}
        </Grid>
        {card === false && divider !== false && <Divider sx={{ mt: 2 }} />}
      </MainCard>
    )
  }

  // items
  if (
    (item && item.type === 'item') ||
    (item?.type === 'group' && item?.url) ||
    custom
  ) {
    itemTitle = item?.title

    ItemIcon = item?.icon ? item.icon : ApartmentOutlined
    itemContent = (
      <Typography variant="subtitle1" color="text.primary">
        {icons && <ItemIcon style={iconSX} />}
        {itemTitle}
      </Typography>
    )

    let tempContent = (
      <MuiBreadcrumbs
        aria-label="breadcrumb"
        maxItems={maxItems || 8}
        separator={separatorIcon}
      >
        <NextLink href="/" passHref legacyBehavior>
          <Typography
            color="text.secondary"
            variant="h6"
            sx={{ textDecoration: 'none', cursor: 'pointer' }}
          >
            {icons && <HomeOutlined style={iconSX} />}
            {icon && !icons && (
              <HomeFilled style={{ ...iconSX, marginRight: 0 }} />
            )}
            {(!icon || icons) && 'Home'}
          </Typography>
        </NextLink>
        {mainContent}
        {itemContent}
      </MuiBreadcrumbs>
    )

    /**
     * カスタムBreadcrumbs
     * <Breadcrumbs>のpropsにcustomとroutePropsを渡した場合に表示される
     * 統計ダッシュボードはこのパターンを利用する
     */
    if (custom && breadcrumbsProps) {
      const {
        currentKind: { kindId },
      } = breadcrumbsProps

      tempContent = (
        <MuiBreadcrumbs
          aria-label="breadcrumb"
          maxItems={maxItems || 8}
          separator={separatorIcon}
        >
          <NextLink href="/" passHref legacyBehavior>
            <Typography
              color="text.secondary"
              variant="h6"
              sx={{ textDecoration: 'none', cursor: 'pointer' }}
            >
              {icons && <HomeOutlined style={iconSX} />}
              {icon && !icons && (
                <HomeFilled style={{ ...iconSX, marginRight: 0 }} />
              )}
              {(!icon || icons) && 'Home'}
            </Typography>
          </NextLink>
          <BreadcrumbsField
            fields={breadcrumbsProps.fields}
            currentField={breadcrumbsProps.currentField}
          />
          <BreadcrumbsMenu
            menus={breadcrumbsProps.menus}
            currentMenu={breadcrumbsProps.currentMenu}
          />
          {kindId === 'prefecture-rank' && (
            <BreadcrumbsPage
              pages={breadcrumbsProps.pages}
              currentPage={breadcrumbsProps.currentPage}
            />
          )}
          {(kindId === 'prefecture' || kindId === 'city') && (
            <BreadcrumbsPrefecture
              prefectures={breadcrumbsProps.prefectures}
              currentPrefecture={breadcrumbsProps.currentPrefecture}
            />
          )}
          {kindId === 'city' && (
            <BreadcrumbsCity
              cities={breadcrumbsProps.cities}
              currentCity={breadcrumbsProps.currentCity}
            />
          )}
        </MuiBreadcrumbs>
      )
    }

    if (item?.breadcrumbs !== false || custom) {
      breadcrumbContent = (
        <MainCard
          border={card}
          sx={
            card === false
              ? { mb: 1, bgcolor: 'inherit', backgroundImage: 'none', ...sx }
              : { mb: 1, ...sx }
          }
          // {...others}
          content={card}
          shadow="none"
        >
          <Grid
            container
            direction={rightAlign ? 'row' : 'column'}
            justifyContent={rightAlign ? 'space-between' : 'flex-start'}
            alignItems={rightAlign ? 'center' : 'flex-start'}
            spacing={1}
          >
            {title && !titleBottom && (
              <Grid item>
                <Typography variant="h2">
                  {custom ? breadcrumbsProps.pageTitle : item?.title}
                </Typography>
              </Grid>
            )}
            <Grid item>{tempContent}</Grid>
            {title && titleBottom && (
              <Grid item sx={{ mt: card === false ? 0.25 : 1 }}>
                <Typography variant="h2">
                  {custom ? breadcrumbsProps.pageTitle : item?.title}
                </Typography>
              </Grid>
            )}
          </Grid>
          {card === false && divider !== false && <Divider sx={{ mt: 2 }} />}
        </MainCard>
      )
    }
  }

  return breadcrumbContent
}

export default Breadcrumbs
