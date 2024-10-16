import AreaChartOutlined from '@ant-design/icons/AreaChartOutlined'
import BankOutlined from '@ant-design/icons/BankOutlined'
import CarOutlined from '@ant-design/icons/CarOutlined'
import CloudOutlined from '@ant-design/icons/CloudOutlined'
import DatabaseOutlined from '@ant-design/icons/DatabaseOutlined'
import DollarOutlined from '@ant-design/icons/DollarOutlined'
import FireOutlined from '@ant-design/icons/FireOutlined'
import GlobalOutlined from '@ant-design/icons/GlobalOutlined'
import GoldOutlined from '@ant-design/icons/GoldOutlined'
import HeartOutlined from '@ant-design/icons/HeartOutlined'
import HomeOutlined from '@ant-design/icons/HomeOutlined'
import IdcardOutlined from '@ant-design/icons/IdcardOutlined'
import LineChartOutlined from '@ant-design/icons/LineChartOutlined'
import MedicineBoxOutlined from '@ant-design/icons/MedicineBoxOutlined'
import ReadOutlined from '@ant-design/icons/ReadOutlined'
import ShopOutlined from '@ant-design/icons/ShopOutlined'
import TransactionOutlined from '@ant-design/icons/TransactionOutlined'
import TruckOutlined from '@ant-design/icons/TruckOutlined'
import UserOutlined from '@ant-design/icons/UserOutlined'

import { MenuGroup } from 'menu-items'

const icons = {
  UserOutlined,
  LineChartOutlined,
  IdcardOutlined,
  DatabaseOutlined,
  CloudOutlined,
  DollarOutlined,
  GlobalOutlined,
  MedicineBoxOutlined,
  HeartOutlined,
  BankOutlined,
  CarOutlined,
  ReadOutlined,
  TransactionOutlined,
  TruckOutlined,
  FireOutlined,
  ShopOutlined,
  HomeOutlined,
  GoldOutlined,
  AreaChartOutlined,
}

const social: MenuGroup = {
  id: 'group-social',
  title: '社会・人口統計',
  icon: icons.IdcardOutlined,
  type: 'group',
  children: [
    {
      id: 'landweather',
      title: '国土・気象',
      type: 'collapse',
      icon: icons.CloudOutlined,
      children: [
        {
          id: 'area',
          title: '面積',
          type: 'item',
          url: '/landweather/area',
          breadcrumbs: false,
        },
        {
          id: 'weather',
          title: '天候・気象',
          type: 'item',
          url: '/landweather/weather',
          breadcrumbs: false,
        },
      ],
    },
    {
      id: 'population',
      title: '人口・世帯',
      type: 'collapse',
      icon: icons.UserOutlined,
      children: [
        {
          id: 'population',
          title: '人口',
          type: 'item',
          url: '/population/population',
          breadcrumbs: false,
        },
        {
          id: 'household',
          title: '世帯',
          type: 'item',
          url: '/population/household',
          breadcrumbs: false,
        },
        {
          id: 'birthdeath',
          title: '出生・死亡',
          type: 'item',
          url: '/population/birthdeath',
          breadcrumbs: false,
        },
        {
          id: 'marriage',
          title: '結婚・離婚',
          type: 'item',
          url: '/population/marriage',
          breadcrumbs: false,
        },
      ],
    },
    {
      id: 'laborwage',
      title: '労働・賃金',
      type: 'collapse',
      icon: icons.DollarOutlined,
      children: [
        {
          id: 'laborforce',
          title: '労働力',
          type: 'item',
          url: '/laborwage/laborforce',
          breadcrumbs: false,
        },
      ],
    },
    {
      id: 'agriculture',
      title: '農林水産業',
      type: 'collapse',
      icon: icons.LineChartOutlined,
      children: [
        {
          id: 'agriculture',
          title: '農業',
          type: 'item',
          url: '/agriculture/agriculture',
          breadcrumbs: false,
        },
        {
          id: 'fishing',
          title: '漁業',
          type: 'item',
          url: '/agriculture/fishing',
          breadcrumbs: false,
        },
      ],
    },
    {
      id: 'miningindustry',
      title: '鉱工業',
      type: 'collapse',
      icon: icons.GoldOutlined,
      children: [
        {
          id: 'products',
          title: '製造品出荷額',
          type: 'item',
          url: '/miningindustry/products',
          breadcrumbs: false,
        },
      ],
    },
    {
      id: 'commercial',
      title: '商業・サービス業',
      type: 'collapse',
      icon: icons.ShopOutlined,
      children: [
        {
          id: 'product-sales',
          title: '商品販売額',
          type: 'item',
          url: '/commercial/product-sales',
          breadcrumbs: false,
        },
      ],
    },
    {
      id: 'economy',
      title: '企業・家計・経済',
      type: 'collapse',
      icon: icons.TransactionOutlined,
      children: [
        {
          id: 'gross-production',
          title: '県内総生産',
          type: 'item',
          url: '/economy/gross-production',
          breadcrumbs: false,
        },
        {
          id: 'consumer-price-index',
          title: '消費者物価指数',
          type: 'item',
          url: '/economy/consumer-price-index',
          breadcrumbs: false,
        },
        {
          id: 'household-budget',
          title: '家計',
          type: 'item',
          url: '/economy/household-budget',
          breadcrumbs: false,
        },
      ],
    },
    {
      id: 'construction',
      title: '住宅・土地・建設',
      type: 'collapse',
      icon: icons.HomeOutlined,
      children: [
        {
          id: 'construction',
          title: '建設業',
          type: 'item',
          url: '/construction/construction',
          breadcrumbs: false,
        },
        {
          id: 'standard-price',
          title: '標準価格',
          type: 'item',
          url: '/construction/standard-price',
          breadcrumbs: false,
        },
        {
          id: 'housing',
          title: '住宅',
          type: 'item',
          url: '/construction/housing',
          breadcrumbs: false,
        },
      ],
    },
    {
      id: 'energy',
      title: 'エネルギー・水',
      type: 'collapse',
      icon: icons.FireOutlined,
      children: [
        {
          id: 'electric-gas',
          title: '電力・ガス',
          type: 'item',
          url: '/energy/electric-gas',
          breadcrumbs: false,
        },
        {
          id: 'industrial-water',
          title: '工業用水',
          type: 'item',
          url: '/energy/industrial-water',
          breadcrumbs: false,
        },
        {
          id: 'garbage',
          title: 'ごみ',
          type: 'item',
          url: '/energy/garbage',
          breadcrumbs: false,
        },
      ],
    },
    {
      id: 'tourism',
      title: '運輸・観光',
      type: 'collapse',
      icon: icons.TruckOutlined,
      children: [
        {
          id: 'railway-air',
          title: '鉄道・航空',
          type: 'item',
          url: '/tourism/railway-air',
          breadcrumbs: false,
        },
        {
          id: 'inns',
          title: '宿泊施設',
          type: 'item',
          url: '/tourism/inns',
          breadcrumbs: false,
        },
      ],
    },
    {
      id: 'educationsports',
      title: '教育・文化・スポーツ',
      type: 'collapse',
      icon: icons.ReadOutlined,
      children: [
        {
          id: 'primary-school',
          title: '小学校',
          type: 'item',
          url: '/educationsports/primary-school',
          breadcrumbs: false,
        },
        {
          id: 'junior-high-school',
          title: '中学校',
          type: 'item',
          url: '/educationsports/junior-high-school',
          breadcrumbs: false,
        },
        {
          id: 'high-school',
          title: '高等学校',
          type: 'item',
          url: '/educationsports/high-school',
          breadcrumbs: false,
        },
      ],
    },
    {
      id: 'administrativefinancial',
      title: '行財政',
      type: 'collapse',
      icon: icons.BankOutlined,
      children: [
        {
          id: 'staff',
          title: '職員',
          type: 'item',
          url: '/administrativefinancial/staff',
          breadcrumbs: false,
        },
        {
          id: 'finances',
          title: '財政',
          type: 'item',
          url: '/administrativefinancial/finances',
          breadcrumbs: false,
        },
      ],
    },
    {
      id: 'safetyenvironment',
      title: '司法・安全・環境',
      type: 'collapse',
      icon: icons.HeartOutlined,
      children: [
        {
          id: 'traffic-accident',
          title: '交通事故',
          type: 'item',
          url: '/safetyenvironment/traffic-accident',
          breadcrumbs: false,
        },
        {
          id: 'fire',
          title: '消防・火災',
          type: 'item',
          url: '/safetyenvironment/fire',
          breadcrumbs: false,
        },
        {
          id: 'crime',
          title: '犯罪',
          type: 'item',
          url: '/safetyenvironment/crime',
          breadcrumbs: false,
        },
        {
          id: 'disaster-pollution',
          title: '災害・公害',
          type: 'item',
          url: '/safetyenvironment/disaster-pollution',
          breadcrumbs: false,
        },
      ],
    },
    {
      id: 'socialsecurity',
      title: '社会保障・衛生',
      type: 'collapse',
      icon: icons.MedicineBoxOutlined,
      children: [
        {
          id: 'health',
          title: '健康',
          type: 'item',
          url: '/socialsecurity/health',
          breadcrumbs: false,
        },
        {
          id: 'hospital',
          title: '病院',
          type: 'item',
          url: '/socialsecurity/hospital',
          breadcrumbs: false,
        },
        {
          id: 'suicide-person',
          title: '自殺者',
          type: 'item',
          url: '/socialsecurity/suicide-person',
          breadcrumbs: false,
        },
      ],
    },
    {
      id: 'international',
      title: '国際',
      type: 'collapse',
      icon: icons.GlobalOutlined,
      children: [
        {
          id: 'foreigner',
          title: '外国人',
          type: 'item',
          url: '/international/foreigner',
          breadcrumbs: false,
        },
      ],
    },
    {
      id: 'infrastructure',
      title: '社会基盤施設',
      type: 'collapse',
      icon: icons.AreaChartOutlined,
      children: [
        {
          id: 'road',
          title: '道路',
          type: 'item',
          url: '/infrastructure/road',
          breadcrumbs: false,
        },
        {
          id: 'urban-planning',
          title: '都市計画',
          type: 'item',
          url: '/infrastructure/urban-planning',
          breadcrumbs: false,
        },
      ],
    },
  ],
}

export default social
