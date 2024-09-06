import AppstoreAddOutlined from '@ant-design/icons/AppstoreAddOutlined'
import AreaChartOutlined from '@ant-design/icons/AreaChartOutlined'
import CarOutlined from '@ant-design/icons/CarOutlined'
import StockOutlined from '@ant-design/icons/StockOutlined'
import UserOutlined from '@ant-design/icons/UserOutlined'

import { MenuGroup } from 'menu-items'

const icons = {
  UserOutlined,
  AppstoreAddOutlined,
  CarOutlined,
  StockOutlined,
  AreaChartOutlined,
}

const doboku: MenuGroup = {
  id: 'group-applications',
  title: '社会基盤施設',
  icon: icons.AppstoreAddOutlined,
  type: 'group',
  children: [
    {
      id: 'road',
      title: '道路',
      type: 'item',
      url: '/road',
      icon: icons.CarOutlined,
    },
    {
      id: 'river',
      title: '河川・砂防',
      type: 'item',
      url: '/river',
      icon: icons.StockOutlined,
    },
    {
      id: 'urban-planning',
      title: '都市計画',
      type: 'item',
      url: '/urban-planning',
      icon: icons.AreaChartOutlined,
    },
  ],
}

export default doboku
