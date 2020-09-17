<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="5">
        <el-input v-model="search.name" placeholder="请输入要查的项目名"></el-input>
      </el-col>
      <el-col :span="19">
        <el-button type="primary" icon="el-icon-search" plain @click="searchData()">搜索</el-button>
        <el-button type="primary" icon="el-icon-close" plain @click="close()">关闭</el-button>
      </el-col>
    </el-row>
    <el-table :data="result.tableData" style="width: 100%" >


      <el-table-column label="ID" width="80" prop="id">
      </el-table-column>

      <el-table-column label="名称" prop="name">
      </el-table-column>
      <el-table-column label="单价" prop="fee">
      </el-table-column>

      <el-table-column label="操作" width="220px">
        <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="select(scope.row)">选择</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="margin-top:20px;" background layout="prev, pager, next" :page-count="result.pages"
      :current-page.sync="query.pageNo" :page-size="query.pageSize" @current-change="getData()">
    </el-pagination>


  </div>
</template>

<script>

  export default {
    name: 'CheckItem',
    data() {
      return {
        search: {
          name: ''
        },
        query: {
          name: '',
          pageNo: 1,
          pageSize: 8
        },
        result: {
          tableData: [],
          pages: 0
        },
        show: false,
        title: ''
      }
    },
    components: {

    },
    created() {
      this.getData()
    },
    methods: {
      getData() {
        this.axios.get('/inspect-item/list', response => {
          this.result.tableData = response.obj.records
          this.result.pages = response.obj.pages
        }, this.query)
      },
      searchData() {
        this.query.name = this.search.name
        this.query.pageNo = 1
        this.getData()
      },
      select(inspectItem) {
          this.$emit('selectInspectItem',inspectItem);
      },
      close(){
           this.$emit('update:show', false)
      }
    }
  }
</script>
<style scoped>
</style>
