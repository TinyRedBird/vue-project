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
    redirect: '/Login'
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    meta:{ requiresAuth:true,role:2 }
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register
  },
  {
    path: '/Good/:storeId/:goodsId',
    name: 'Good',
    component: Good,
    meta:{ requiresAuth:true,role:2 }
  },
  {
    path: '/Shop/:storeId/:typeId',
    name: 'Shop',
    component: Shop,
    meta:{ requiresAuth:true,role:2 }
  },
  {
    path: '/SearchGood/:keyWord',
    name: 'SearchGood',
    component: SearchGood,
    meta:{ requiresAuth:true,role:2 }
  },
  {
    path: '/SearchShop/:keyWord',
    name: 'SearchShop',
    component: SearchShop,
    meta:{ requiresAuth:true,role:2 }
  },
  {
    path: '/MyOrder',
    name: 'MyOrder',
    component: MyOrder,
    meta:{ requiresAuth:true,role:2 }
  },
  {
    path: '/admin',
    component: AdminLayout,
    redirect: '/admin/sale',
    meta:{ requiresAuth:true,role:1 },
    children: [
      { path: '/admin/sale', component: () => import('../views/Admin/sale/SaleManage.vue') },
      { path: '/admin/goods', component: () => import('../views/Admin/goods/GoodsManage.vue') },
      { path: '/admin/store', component: () => import('../views/Admin/store/StoreManage.vue') },
      { path: '/admin/user', component: () => import('../views/Admin/user/UserManage.vue') },
      { path: '/admin/type', component: () => import('../views/Admin/type/TypeManage.vue') },
      { path: '/admin/setting', component: () => import('../views/Admin/setting/BannerManage.vue') }
    ]
  },
  {
    path:'/:catchAll(.*)',component:()=>import('../views/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

import { useTokenStore } from '@/stores/token'
import useUserInfoStore from '@/apis/userInfo'
//路由守卫
router.beforeEach((to,from,next)=>{
  const tokenStore=useTokenStore()
  const userInfoStore=useUserInfoStore()
  console.log(to,from)
  if(to.meta.requiresAuth&&!tokenStore.token){
    next({path:'/'}) //需要登录但没登陆,跳转到登录
  }else if(to.meta.role&&to.meta.role!=userInfoStore.info.role){
    next({path:'/404'}) //需要权限但权限不符
  }else{
    next()
  }
})

export default router
