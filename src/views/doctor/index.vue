<template>
  <el-container class="doctor-container">
    <el-aside width="300px" class="left">
      患者列表
      <el-tabs v-model="registType" @tab-click="handleClick">
        <el-tab-pane label="本人" name="person">
          <RegistList :type="0" @rowselect="rowselect" :key="keynum"></RegistList>
        </el-tab-pane>
        <el-tab-pane label="本科室" name="dept">
           <RegistList :type="1" @rowselect="rowselect" :key="keynum2"></RegistList>
        </el-tab-pane>
      </el-tabs>
    </el-aside>
    <el-main>
      <el-tabs v-model="dealType" @tab-click="handleClick" :before-leave="changeDealType">
        <el-tab-pane label="病历首页" name="PaperHome">
          <PaperHome :register="register"  @update="update"></PaperHome>
        </el-tab-pane>
        <el-tab-pane label="检查申请" name="CheckApply">
          <CheckApply :register="register" ></CheckApply>
        </el-tab-pane>
        <el-tab-pane label="检验申请" name="InspectApply">
          <InspectApply :register="register"></InspectApply>
        </el-tab-pane>
        <el-tab-pane label="诊断" name="Diagnosis">
          <Diagnosis :register="register"></Diagnosis>
        </el-tab-pane>

      </el-tabs>

    </el-main>
  </el-container>

</template>

<script>
  import PaperHome from '@/views/doctor/paper-home'
  import CheckApply from '@/views/doctor/check-apply'
  import InspectApply from '@/views/doctor/inspect-apply'
  import RegistList from '@/views/doctor/regist-list'
  import Diagnosis from '@/views/doctor/diagnosis'

  export default {
    name: 'DoctorHome',
    components: {
      PaperHome,
      CheckApply,
      InspectApply,
      RegistList,
      Diagnosis
    },
    data() {
      return {
        keynum: 0,
        keynum2: 1,
        registType: 'person',
        dealType: 'PaperHome',
        register: null,
      }
    },
    methods: {
      handleClick() {

      },
      rowselect(reg) {
       // console.log("在父组件中接收到的数据")
         this.register = reg
         this.dealType = 'PaperHome'
      },
      update() {
        ++this.keynum
        ++this.keynum2
      },
      changeDealType(activeName ,oldActiveName){
         if(activeName == 'CheckApply'
          || activeName == 'InspectApply'
           || activeName == 'Diagnosis'){
            //当选择申请检查，申请检验 需要判断选择人 ，状态变为已接诊
            if(this.register  && this.register.status == 2){
                return true
            }
            this.$message("请选择已接诊的患者")
            return false;
         }else{
           return true
         }


      }
    },
    created() {}
  }
</script>

<style scoped>
  .doctor-container {
    height: 100vh;
  }

  .left {
    border-right: 1px solid #A9A9A9;

  }
</style>
