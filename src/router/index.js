import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('@/views'),
      children: [
        {
          path: '/user',
          name: 'User',
          component: () => import('@/views/user')
        },
        {
          path: '/role',
          name: 'Role',
          component: () => import('@/views/role')
        },
        {
          path: '/permission',
          name: 'Permission',
          component: () => import('@/views/permission')
        },
        {
          path: '/user-role',
          name: 'UserRole',
          component: () => import('@/views/user/user-role')
        },
        {
          path: '/role-permiss',
          name: 'RolePermiss',
          component: () => import('@/views/role/role-permiss')
        },
        {
          path: '/constant-type',
          name: 'ConstantType',
          component: () => import('@/views/constant-type')
        },
        {
          path: '/constant-item',
          name: 'ConstantItem',
          component: () => import('@/views/constant-item')
        },
        {
          path: '/registlevel',
          name: 'RegistLevel',
          component: () => import('@/views/registlevel')
        },
        {
          path: '/dept',
          name: 'Department',
          component: () => import('@/views/department')
        },
        {
          path: '/regist',
          name: 'Regist',
          component: () => import('@/views/regist')
        },
        {
          path: '/doctor-home',
          name: 'DoctorHome',
          component: () => import('@/views/doctor')
        },
        {
          path: '/check-item',
          name: 'CheckItem',
          component: () => import('@/views/check-item')
        },
        {
          path: '/inspect-item',
          name: 'InspectItem',
          component: () => import('@/views/inspect-item')
        },
        {
          path: '/fee',
          name: 'Fee',
          component: () => import('@/views/regist/fee')
        },
        {
          path: '/return_num',
          name: 'ReturnNum',
          component: () => import('@/views/regist/return_num')
        },
        {
          path: '/refund',
          name: 'Refund',
          component: () => import('@/views/regist/refund')
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login')
    }
  ]
})
