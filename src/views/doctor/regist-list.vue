<template>
  <div>

    <el-tag size="mini"  style="width: 100%;margin-bottom: 5px;">待诊患者</el-tag>
    <el-table :data="waitRegisters" style="width: 100%"
    :max-height="180" size="mini"
    :highlight-current-row="true"
    :show-header="false"  @row-click="handlerRowSelect">

      <el-table-column label="id" prop="id">
      </el-table-column>
      <el-table-column label="name" prop="name">
      </el-table-column>
      <el-table-column label="age" prop="age">
      </el-table-column>

    </el-table>

    <br><br>

    <el-tag size="mini"  style="width: 100%;margin-bottom: 5px;">已诊患者</el-tag>
    <el-table :data="unWaitRegisters" style="width: 100%" :max-height="180" size="mini"
     @row-click="handlerRowSelect"

    :highlight-current-row="true" :show-header="false" >

      <el-table-column label="id" prop="id">
      </el-table-column>
      <el-table-column label="name" prop="name">
      </el-table-column>
      <el-table-column label="age" prop="age">
      </el-table-column>

    </el-table>

  </div>
</template>

<script>
  export default {
    name: 'RegistList',
    props: ['type'],
    components: {

    },
    data() {
      return {
        title: '',
        tableData: []
      }
    },
    methods: {
      handlerRowSelect(row, column, event) {
         // console.log(row);
         //alert('选中'+row)
         this.$emit('rowselect',row)
      }
    },
    computed:{
        waitRegisters(){
          let  registers = [];
           for(let i=0; i<this.tableData.length ;i++){
              if(this.tableData[i].status == 1){
                 registers.push(this.tableData[i])
              }
           }
           return registers;
        },
        unWaitRegisters(){
          let  registers = [];
           for(let i=0; i<this.tableData.length ;i++){
              if(this.tableData[i].status != 1){
                 registers.push(this.tableData[i])
              }
           }
           return registers;
        }
    },
    created() {
      if (this.type === 0) {
        this.title = "本医生"
      } else {
        this.title = "本科室"
      }


      this.axios.get('/doctor/regist-list', response => {
        this.tableData = response.obj;
       // console.log(this.tableData );
      }, {
        type: this.type
      })

    }
  }
</script>

<style>
</style>
