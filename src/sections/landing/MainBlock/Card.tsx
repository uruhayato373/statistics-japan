import React from 'react'

import Link from 'next/link'

import { Box, Button, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import AnimateButton from 'components/@extended/AnimateButton'
import MainCard from 'components/MainCard'

// Styled components
const StyledMainCard = styled(MainCard)(({ theme }) => ({
  padding: theme.spacing(3),
}))

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
  },
}))

// Custom button component
const StyledButton = ({ href, variant, children }) => (
  <Grid item xs={12} lg={6}>
    <AnimateButton>
      <Link href={href} passHref>
        <Button variant={variant} fullWidth>
          {children}
        </Button>
      </Link>
    </AnimateButton>
  </Grid>
)

interface MenuCardProps {
  params: {
    fieldId: string
    menuId: string
    pageId: string
    areaCode: string
  }
  texts: {
    title: string
    description: string
  }
}

// Main component
const MenuCard = ({ params, texts }: MenuCardProps) => {
  return (
    <StyledMainCard>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h3" fontWeight={600}>
            {texts.title}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" color="text.secondary">
            {texts.description}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ButtonContainer>
            <Grid container spacing={1}>
              <StyledButton
                href={`/${params.fieldId}/${params.menuId}/prefecture/${params.areaCode}`}
                variant="outlined"
              >
                都道府県の統計
              </StyledButton>
              <StyledButton
                href={`/${params.fieldId}/${params.menuId}/prefecture-rank/${params.pageId}/`}
                variant="outlined"
              >
                ランキング
              </StyledButton>
            </Grid>
          </ButtonContainer>
        </Grid>
      </Grid>
    </StyledMainCard>
  )
}

export default MenuCard
