import AppstoreAddOutlined from '@ant-design/icons/AppstoreAddOutlined'
import UserOutlined from '@ant-design/icons/UserOutlined'

import { MenuGroup } from 'menu-items'

const icons = {
  UserOutlined,
  AppstoreAddOutlined,
}

const applications: MenuGroup = {
  id: 'group-applications',
  title: 'Applications',
  icon: icons.AppstoreAddOutlined,
  type: 'group',
  children: [
    {
      id: 'about-site',
      title: 'About Site',
      type: 'item',
      url: '/about-site',
      icon: icons.UserOutlined,
    },
  ],
}

export default applications
