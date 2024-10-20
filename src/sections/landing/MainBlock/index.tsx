import React from 'react'

import { Container, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import MenuCard from './Card'

// Constants
const TEXTS = {
  SUBTITLE: 'stats47.jp',
  TITLE: '統計で見る都道府県',
  DESCRIPTION:
    '都道府県に関する様々な統計をビジュアライズ化します。あなたの街の統計を見てみましょう。',
}

const MENU_CARDS = [
  {
    props: {
      params: {
        fieldId: 'landweather',
        menuId: 'area',
        pageId: 'total-area',
        areaCode: '28000',
      },
      texts: {
        title: '国土・気象',
        description:
          '都道府県の総面積や最高気温・最低気温などの統計値を見ることができます。',
      },
    },
  },
  {
    props: {
      params: {
        fieldId: 'population',
        menuId: 'population',
        pageId: 'total-population',
        areaCode: '28000',
      },
      texts: {
        title: '人口・世帯',
        description:
          '都道府県の総人口や世帯数、人口密度などの統計値を見ることができます。',
      },
    },
  },
  {
    props: {
      params: {
        fieldId: 'laborwage',
        menuId: 'laborforce',
        pageId: 'laborforce-population',
        areaCode: '28000',
      },
      texts: {
        title: '労働・賃金',
        description:
          '都道府県の労働力人口や就業者数、失業率などの統計値を見ることができます。',
      },
    },
  },
  {
    props: {
      params: {
        fieldId: 'agriculture',
        menuId: 'agriculture',
        pageId: 'laborforce-population',
        areaCode: '28000',
      },
      texts: {
        title: '農林水産業',
        description:
          '都道府県の農業産出額や就業者数、漁獲量などの統計値を見ることができます。',
      },
    },
  },
  {
    props: {
      params: {
        fieldId: 'miningindustry',
        menuId: 'products',
        pageId: 'product-shipment-amount',
        areaCode: '28000',
      },
      texts: {
        title: '鉱工業',
        description:
          '都道府県の製造品出荷額や事業所数・従業者数などの統計値を見ることができます。',
      },
    },
  },
  {
    props: {
      params: {
        fieldId: 'commercial',
        menuId: 'product-sales',
        pageId: 'product-sales-amount',
        areaCode: '28000',
      },
      texts: {
        title: '商業・サービス業',
        description:
          '都道府県の商品販売額や事業所数・従業者数などの統計値を見ることができます。',
      },
    },
  },
  {
    props: {
      params: {
        fieldId: 'economy',
        menuId: 'gross-production',
        pageId: 'gross-prefectural-product',
        areaCode: '28000',
      },
      texts: {
        title: '企業・家計・経済',
        description:
          '都道府県の県内総生産や物価指数、家計などの統計値を見ることができます。',
      },
    },
  },
  {
    props: {
      params: {
        fieldId: 'construction',
        menuId: 'standard-price',
        pageId: 'residential-area-price',
        areaCode: '28000',
      },
      texts: {
        title: '住宅・土地・建設',
        description:
          '都道府県の土地価格や住宅状況、建設業などの統計値を見ることができます。',
      },
    },
  },
  {
    props: {
      params: {
        fieldId: 'energy',
        menuId: 'electric-gas',
        pageId: 'generated-power-amount',
        areaCode: '28000',
      },
      texts: {
        title: 'エネルギー・水',
        description:
          '都道府県の電力・ガスや工業用水、ごみ処理などの統計値を見ることができます。',
      },
    },
  },
  {
    props: {
      params: {
        fieldId: 'tourism',
        menuId: 'railway-air',
        pageId: 'jr-transportation-personnel',
        areaCode: '28000',
      },
      texts: {
        title: '運輸・観光',
        description:
          '都道府県の陸運、海運、観光などの統計値を見ることができます。',
      },
    },
  },
  {
    props: {
      params: {
        fieldId: 'educationsports',
        menuId: 'primary-school',
        pageId: 'primary-schools',
        areaCode: '28000',
      },
      texts: {
        title: '教育・文化・スポーツ',
        description:
          '都道府県の教育・文化、スポーツに関する統計値を見ることができます。',
      },
    },
  },
  {
    props: {
      params: {
        fieldId: 'administrativefinancial',
        menuId: 'staff',
        pageId: 'administrative-department-employees',
        areaCode: '28000',
      },
      texts: {
        title: '行財政',
        description:
          '都道府県の交通事故や消防火災、犯罪に関する統計値を見ることができます。',
      },
    },
  },
  {
    props: {
      params: {
        fieldId: 'safetyenvironment',
        menuId: 'traffic-accident',
        pageId: 'number-of-traffic-accidents',
        areaCode: '28000',
      },
      texts: {
        title: '司法・安全・環境',
        description:
          '都道府県の農業産出額や就業者数、漁獲量などの統計値を見ることができます。',
      },
    },
  },
  {
    props: {
      params: {
        fieldId: 'socialsecurity',
        menuId: 'health',
        pageId: 'healthy-life-expectancy',
        areaCode: '28000',
      },
      texts: {
        title: '社会保障・衛生',
        description:
          '都道府県の健康寿命や病院数、医師数などの統計値を見ることができます。',
      },
    },
  },
  {
    props: {
      params: {
        fieldId: 'international',
        menuId: 'foreigner',
        pageId: 'foreign-population',
        areaCode: '28000',
      },
      texts: {
        title: '国際',
        description:
          '都道府県の外国人人口や出入国に関する統計値を見ることができます。',
      },
    },
  },
]

// Styled components
const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(2.5),
  marginBottom: theme.spacing(2.5),
  [theme.breakpoints.up('md')]: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(10),
  },
}))

const HeaderGrid = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  textAlign: 'center',
}))

// Header component
const Header = () => (
  <HeaderGrid container spacing={1} justifyContent="center">
    <Grid item sm={10} md={6}>
      <Grid container spacing={1} justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="subtitle1" color="primary">
            {TEXTS.SUBTITLE}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h2" sx={{ mb: 2 }}>
            {TEXTS.TITLE}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">{TEXTS.DESCRIPTION}</Typography>
        </Grid>
      </Grid>
    </Grid>
  </HeaderGrid>
)

// Main component
const MainBlock: React.FC = () => {
  return (
    <StyledContainer>
      <Grid container alignItems="center" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        {MENU_CARDS.map((card, index) => (
          <Grid item xs={12} sm={4} md={4} key={index}>
            <MenuCard {...card.props} />
          </Grid>
        ))}
      </Grid>
    </StyledContainer>
  )
}

export default MainBlock
