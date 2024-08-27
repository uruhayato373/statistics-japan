import CloudOutlined from '@ant-design/icons/CloudOutlined'
import DatabaseOutlined from '@ant-design/icons/DatabaseOutlined'
import DollarOutlined from '@ant-design/icons/DollarOutlined'
import IdcardOutlined from '@ant-design/icons/IdcardOutlined'
import LineChartOutlined from '@ant-design/icons/LineChartOutlined'
import UserOutlined from '@ant-design/icons/UserOutlined'

import { MenuGroup } from 'menu-items'

const icons = {
  UserOutlined,
  LineChartOutlined,
  IdcardOutlined,
  DatabaseOutlined,
  CloudOutlined,
  DollarOutlined,
}

const widget: MenuGroup = {
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
        // {
        //   id: 'household',
        //   title: '世帯',
        //   type: 'item',
        //   url: '/population/household',
        //   breadcrumbs: false,
        // },
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
          title: '農業産出額',
          type: 'item',
          url: '/agriculture/agriculture',
          breadcrumbs: false,
        },
      ],
    },
  ],
}

export default widget
