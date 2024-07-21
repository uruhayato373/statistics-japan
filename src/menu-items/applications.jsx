import AppstoreAddOutlined from '@ant-design/icons/AppstoreAddOutlined'
import BuildOutlined from '@ant-design/icons/BuildOutlined'
import CalendarOutlined from '@ant-design/icons/CalendarOutlined'
import CustomerServiceOutlined from '@ant-design/icons/CustomerServiceOutlined'
import FileTextOutlined from '@ant-design/icons/FileTextOutlined'
import LinkOutlined from '@ant-design/icons/LinkOutlined'
import MessageOutlined from '@ant-design/icons/MessageOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import ShoppingCartOutlined from '@ant-design/icons/ShoppingCartOutlined'
import UserOutlined from '@ant-design/icons/UserOutlined'

const icons = {
  BuildOutlined,
  CalendarOutlined,
  CustomerServiceOutlined,
  MessageOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  AppstoreAddOutlined,
  FileTextOutlined,
  PlusOutlined,
  LinkOutlined,
}

const applications = {
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
