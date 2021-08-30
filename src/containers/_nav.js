import React from 'react';
import CIcon from '@coreui/icons-react';

const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: 'info',
      text: 'Home',
    }
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Main']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Main',
    to: '/main',
    icon: 'cil-home',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Typography',
    to: '/theme',
    icon: 'cil-pencil',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Components']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Address',
    to: '/alladdress',
    icon: 'cil-user'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Category',
    to: '/category',
    icon: 'cil-puzzle'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Products',
    to: '/products',
    icon: 'cib-paypal'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Order',
    to: '/order',
    icon: 'cil-basket',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Signout',
    to: '/signout',
    icon: 'cil-user-unfollow',
    badge: {
      color: 'warning',
      text: 'Exit',
    },
  },
  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2'
  }
]

export default _nav
