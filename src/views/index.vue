<template>
  <el-container class="wrap">
    <el-header class="header">



      <el-row>
        <el-col :span="20">东软云HIS医疗管理信息系统</el-col>
        <el-col :span="4">
            <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
                扁鹊<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="Personal">个人设置</el-dropdown-item>
                <el-dropdown-item command="Logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>


        </el-col>
      </el-row>


    </el-header>
    <el-container>
      <el-aside width="200px" class="left">
        <WyMenu></WyMenu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import WyMenu from '@/components/wyMenu'
  import { mapMutations} from 'vuex'
export default {
  name: 'Index',
  data() {
    return {
    }
  },
  components:{
    WyMenu
  },
  methods: {
    ...mapMutations(['setToken']),
    logout() {
      //this.$alert("退出");
      //清空token （axios header ，vuex sessionStorage）
       // axios


       this.axios.post('/ums-user/logout',response =>{
         this.axios.setToken(null)
         this.setToken(null)
         this.$router.push({
           path: '/login'
         })
       })


      //清空服务器端的登录状态
    },
    handleCommand(command) {
      //this.$message('click on item ' + command);
      if(command === 'Logout'){
         this.logout();
      }
    }
  }
}
</script>
<style scoped>
  .el-dropdown-link {
      cursor: pointer;
      color: #fff;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
  .wrap{
    height:100vh;
  }
  .header{
    border-bottom:1px solid #919191;
    line-height: 60px;
    font-size:1.2rem;
    font-weight: bold;
    background-color: #71ABD3;
    color: #fff;
  }
  .left{
    border-right: 1px solid #919191;
    overflow-x: hidden;
    background-color: #222D32;
  }
</style>
