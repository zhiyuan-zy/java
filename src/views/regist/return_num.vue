<template>

  <div>
    <el-row :gutter="10">
      <el-col :span="5">
        <el-input v-model="search.id" placeholder="请输入病历号" size="mini"></el-input>
      </el-col>
      <el-col :span="19">
        <el-button type="primary" icon="el-icon-search" plain @click="searchData()" size="mini">搜索</el-button>
      </el-col>
    </el-row>

     <el-tag size="mini" style="margin-top: 30px;width: 280px;">挂号详情</el-tag>
    <el-table :data="result.tableData" style="width: 100%" size="mini" >
       <el-table-column label="病历号"  prop="id" width="70">
      </el-table-column>
     <el-table-column label="姓名"  prop="name" width="100">
      </el-table-column>
     <el-table-column label="性别"  prop="genderName" width="70">
      </el-table-column>
     <el-table-column label="挂号级别"  prop="levelName">
      </el-table-column>
     <el-table-column label="科室"  prop="deptName">
      </el-table-column>
     <el-table-column label="医生"  prop="doctorName">
      </el-table-column>
       <el-table-column label="挂号时间"  prop="createtime">
      </el-table-column>
      <el-table-column label="挂号状态"  prop="status">
        <template slot-scope="scope" >
           <span v-if="scope.row.status == 1">已挂号</span>
           <span v-else-if="scope.row.status == 2">已接诊</span>
           <span v-else>已退号</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" >

        <template slot-scope="scope" >
            <el-button type="primary" plain v-if="scope.row.status == 1" @click="returnNum(scope.row.id)">退号</el-button>
        </template>

      </el-table-column>
    </el-table>

  </div>


</template>

<script>
  export default {
    name: 'ReturnNum',
    components: {

    },
    data() {
      return {

        result: {
          tableData: [],
        },

        search: {
          id: ''
        },
      }
    },
    methods: {
      searchData() {

        if(!this.search.id ||
           this.search.length<=0
           ||isNaN(this.search.id)){
          this.$message("请输入正确的病历号");
          return;
        }

         this.axios.get('/register/list',response =>{
             this.result.tableData = response.obj.records;
         },
           this.search
         )
      },
      returnNum(id) {

        //this.$alert('id:'+id,"title");

        this.axios.post('/register/update',response =>{
           this.searchData()
        },{
          id:id,
          status:3,

        },"退号成功")

      }
    },
    computed:{
    },
    created() {}
  }
</script>

<style scoped>
  .register{
    margin-top: 15px 0 5px 0;

  }



</style>
