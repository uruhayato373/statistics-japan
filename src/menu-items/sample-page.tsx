import ChromeOutlined from '@ant-design/icons/ChromeOutlined'

import { MenuGroup } from 'menu-items'

const icons = { ChromeOutlined }

const samplePage: MenuGroup = {
  id: 'sample-page',
  title: 'Sample Page',
  type: 'group',
  url: '/sample-page',
  icon: icons.ChromeOutlined,
}

export default samplePage
