<template>
   <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :unique-opened="true"
    background-color="#222D32"
    text-color="#B8C7CE"
    active-text-color="#fff"
    router
    >


    <el-submenu v-for="menu in menus"  :index="menu.id">
      <template slot="title">
        <span>{{menu.name}}</span>
      </template>
      <ChilrenMenu v-for="item in menu.children" :menu="item"></ChilrenMenu>
    </el-submenu>



    <!-- <el-submenu index="1">
      <template slot="title">
        <span>挂号收费</span>
      </template>
        <el-menu-item index="/regist">现场挂号</el-menu-item>
        <el-menu-item index="/fee">收费</el-menu-item>

        <el-menu-item index="/return_num">退号</el-menu-item>
        <el-menu-item index="/refund">退费</el-menu-item>
    </el-submenu>

    <el-submenu index="2">
      <template slot="title">
        <span>医生工作站</span>
      </template>
        <el-menu-item index="/doctor-home">病历首页</el-menu-item>
    </el-submenu>

    <el-submenu index="3">
      <template slot="title">
        <span>用户和权限</span>
      </template>
        <el-menu-item index="/user">用户管理</el-menu-item>
        <el-menu-item index="/role">角色管理</el-menu-item>
        <el-menu-item index="/permission">权限管理</el-menu-item>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <span>基本信息管理</span>
      </template>
        <el-menu-item index="/constant-type">常数类别管理</el-menu-item>
        <el-menu-item index="/constant-item">常数项目管理</el-menu-item>
        <el-menu-item index="/registlevel">挂号级别</el-menu-item>
        <el-menu-item index="/dept">科室管理</el-menu-item>
        <el-menu-item index="/check-item">检查项目管理</el-menu-item>
        <el-menu-item index="/inspect-item">检验项目管理</el-menu-item>
    </el-submenu> -->


  </el-menu>
</template>

<script>
  import ChilrenMenu from '@/components/childrenMenu'
  export default {
    name: 'WyMenu',
    components:{
      ChilrenMenu
    },
    data() {
      return {
        menus:[]
      }
    },
    created() {
        this.axios.post('/ums-permission/userPermissionList',response =>{
          this.menus = response.obj
        },{

        })
    }
  }
</script>

<style>
</style>
