import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Main = React.lazy(() => import('./views/main/Main'));
const Typography = React.lazy(() => import('./views/theme/typography'));

const AllAddress = React.lazy(() => import('./views/alladdress/allAddress'));
const Category = React.lazy(() => import('./views/category/Category'));
const Products = React.lazy(() => import('./views/products/Products'));
const Orders = React.lazy(() => import('./views/order/Orders'));

const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/theme', name: 'Typography', component: Typography },
  { path: '/main', name: 'Main', component: Main },

  { path: '/alladdress', name: 'Address', component: AllAddress },
  { path: '/category', name: 'Category', component: Category },
  { path: '/products', name: 'Products', component: Products },
  { path: '/order', name: 'Orders', component: Orders },

  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
];

export default routes;
