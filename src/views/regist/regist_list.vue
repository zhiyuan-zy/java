<template>
  <div>
    <el-table :data="result.tableData" style="width: 100%" >
       <el-table-column label="病历号"  prop="id" width="100">
      </el-table-column>
     <el-table-column label="姓名"  prop="name" width="100">
      </el-table-column>
     <el-table-column label="性别"  prop="genderName">
      </el-table-column>
     <el-table-column label="挂号级别"  prop="levelName">
      </el-table-column>
     <el-table-column label="科室"  prop="deptName">
      </el-table-column>
     <el-table-column label="医生"  prop="doctorName">
      </el-table-column>
       <el-table-column label="挂号时间"  prop="createtime">
      </el-table-column>
    </el-table>


 <el-pagination style="margin-top:20px;" background layout="prev, pager, next" :page-count="result.pages"
      :current-page.sync="query.pageNo" :page-size="query.pageSize" @current-change="getData()">
    </el-pagination>



  </div>
</template>

<script>
  export default {
    name: 'RegistList',
    data() {
        return {
          result:{
            tableData: []
          },
          query:{
            pageNo: 1,
            pageSize: 5,
            active: 1
          }
        }
    },
    methods:{
      //获取已挂号数据
      getData() {
        this.axios.get('/register/list',response =>{
            this.result.tableData = response.obj.records;
            this.result.pages = response.obj.pages
        },
          this.query
        )
      }
    },
    created() {
      this.getData()
    }
  }
</script>

<style scoped>
</style>
