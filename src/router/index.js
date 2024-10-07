//createRouter :创建router实例对象
//createWebHashHistory ：创建哈希模式的路由
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home/index.vue'
//登录和注册页面反
import Register from '../views/Login/index.vue'
import Login from '../views/Register/index.vue'
import Good from '../views/Good/index.vue'
import Shop from '../views/Shop/index.vue'
import SearchGood from '../views/SearchGood/index.vue'
import SearchShop from '../views/SearchShop/index.vue'
import MyOrder from '../views/MyOrder/index.vue'

import AdminLayout from '../views/Admin/layout/AdminLayout.vue'

const routes = [
  //path和component对应关系的位置
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Resister',
    name: 'Register',
    component: Register
  },
  {
    path: '/Good/:storeId/:goodsId',
    name: 'Good',
    component: Good
    // redirect: ''
  },
  {
    path: '/Shop/:storeId/:typeId',
    name: 'Shop',
    component: Shop
  },
  {
    path: '/SearchGood/:keyWord',
    name: 'SearchGood',
    component: SearchGood
  },
  {
    path: '/SearchShop/:keyWord',
    name: 'SearchShop',
    component: SearchShop
  },
  {
    path: '/MyOrder',
    name: 'MyOrder',
    component: MyOrder
  },
  {
    path: '/admin',
    component: AdminLayout,
    redirect: '/admin/sale',
    children: [
      { path: '/admin/sale', component: () => import('../views/Admin/sale/SaleManage.vue') },
      { path: '/admin/goods', component: () => import('../views/Admin/goods/GoodsManage.vue') },
      { path: '/admin/store', component: () => import('../views/Admin/store/StoreManage.vue') },
      { path: '/admin/user', component: () => import('../views/Admin/user/UserManage.vue') },
      { path: '/admin/type', component: () => import('../views/Admin/type/TypeManage.vue') },
      { path: '/admin/setting', component: () => import('../views/Admin/setting/BannerManage.vue') }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
