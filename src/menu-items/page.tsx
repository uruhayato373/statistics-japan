import AppstoreAddOutlined from '@ant-design/icons/AppstoreAddOutlined'
import ChromeOutlined from '@ant-design/icons/ChromeOutlined'

import { MenuGroup } from 'menu-items'

const icons = { ChromeOutlined, AppstoreAddOutlined }

const page: MenuGroup = {
  id: 'about-site',
  title: 'About Site',
  type: 'group',
  url: '/about-site',
  icon: icons.AppstoreAddOutlined,
}

export default page
