import PropTypes from 'prop-types'

import DashboardLayout from 'layout/DashboardLayout'

export default function Layout({ children }) {
  return <DashboardLayout>{children}</DashboardLayout>
}

Layout.propTypes = { children: PropTypes.node }
