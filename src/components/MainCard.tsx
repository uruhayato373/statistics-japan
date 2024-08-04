'use client'

import { forwardRef, ReactNode } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import { useTheme, SxProps, Theme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import { ThemeMode } from 'config'

import Highlighter from './third-party/Highlighter'

// header style
const headerSX: SxProps<Theme> = {
  p: 2.5,
  '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' },
}

interface MainCardProps {
  border?: boolean
  boxShadow?: boolean
  children?: ReactNode
  subheader?: string | ReactNode
  content?: boolean
  contentSX?: SxProps<Theme>
  darkTitle?: boolean
  divider?: boolean
  secondary?: ReactNode
  sx?: SxProps<Theme>
  title?: string | ReactNode
  codeHighlight?: boolean
  codeString?: string
  modal?: boolean
  [key: string]: unknown
}

const MainCard = forwardRef<HTMLDivElement, MainCardProps>(
  (
    {
      border = true,
      boxShadow,
      children,
      subheader,
      content = true,
      contentSX = {},
      darkTitle,
      divider = true,
      secondary,
      sx = {},
      title,
      codeHighlight = false,
      codeString,
      modal = false,
      ...others
    },
    ref
  ) => {
    const theme = useTheme()
    boxShadow =
      theme.palette.mode === ThemeMode.DARK ? boxShadow || true : boxShadow

    return (
      <Card
        sx={{
          position: 'relative',
          border: border ? '1px solid' : 'none',
          borderRadius: 1,
          borderColor:
            theme.palette.mode === ThemeMode.DARK ? 'divider' : 'grey.A800',
          boxShadow:
            boxShadow && (!border || theme.palette.mode === ThemeMode.DARK)
              ? theme.shadows[1] // カスタムシャドウの代わりに標準のシャドウを使用
              : 'none',
          ':hover': {
            boxShadow: boxShadow ? theme.shadows[1] : 'none', // ここも同様に変更
          },
          ...(theme.palette.mode === ThemeMode.DARK && {
            backgroundImage: 'none',
          }),
          ...(codeHighlight && {
            '& pre': {
              margin: 0,
              padding: '12px !important',
              fontFamily: theme.typography.fontFamily,
              fontSize: '0.75rem',
            },
          }),
          ...(modal && {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: `calc( 100% - 50px)`, sm: 'auto' },
            '& .MuiCardContent-root': {
              overflowY: 'auto',
              minHeight: 'auto',
              maxHeight: `calc(100vh - 200px)`,
            },
          }),
          ...sx,
        }}
        ref={ref}
        {...others}
      >
        {/* card header and action */}
        {!darkTitle && title && (
          <CardHeader
            sx={headerSX}
            titleTypographyProps={{ variant: 'subtitle1' }}
            title={title}
            action={secondary}
            subheader={subheader}
          />
        )}
        {darkTitle && title && (
          <CardHeader
            sx={headerSX}
            title={<Typography variant="h4">{title}</Typography>}
            action={secondary}
          />
        )}

        {/* content & header divider */}
        {title && divider && <Divider />}

        {/* card content */}
        {content && <CardContent sx={contentSX}>{children}</CardContent>}
        {!content && children}

        {/* card footer - clipboard & highlighter  */}
        {codeString && (
          <>
            <Divider sx={{ borderStyle: 'dashed' }} />
            <Highlighter
              codeString={codeString}
              codeHighlight={codeHighlight}
            />
          </>
        )}
      </Card>
    )
  }
)

MainCard.displayName = 'MainCard'

export default MainCard
