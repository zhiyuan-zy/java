<template>


  <div>
    <el-row :gutter="10">
      <el-col :span="5">
        <el-input v-model="search.registerId" placeholder="请输入病历号" size="mini"></el-input>
      </el-col>
      <el-col :span="19">
        <el-button type="primary" icon="el-icon-search" plain @click="searchData()" size="mini">搜索</el-button>

        <el-button type="primary" icon="el-icon-search" plain @click="refund()" size="mini">退费</el-button>
      </el-col>
    </el-row>


    <el-tag size="mini" style="margin-top: 20px;width: 280px;">患者信息</el-tag>

    <el-row :gutter="10" class="register"  style="margin-top: 5px; ">
      <el-col :span="8">
        <el-input v-model="register.name" placeholder="姓名" size="mini" disabled></el-input>
      </el-col>
      <el-col :span="8">
        <el-input v-model="register.gender" placeholder="性别" size="mini" disabled></el-input>
      </el-col>
      <el-col :span="8">
        <el-input v-model="register.idno" placeholder="身份证号" size="mini" disabled></el-input>
      </el-col>
    </el-row>



     <el-tag size="mini" style="margin-top: 50px;width: 280px;">费用列表</el-tag>
    <el-table ref="tab" :data="tableData" style="width: 100%"
    @select="select"
    @selection-change="handleSelectionChange" size="mini">
      <el-table-column type="selection">
      </el-table-column>



      <el-table-column label="费用项目名称" prop="itenName">
      </el-table-column>
      <el-table-column label="费用项目类别" >
        <template slot-scope="scope">
            <span v-if="scope.row.itemType == 1">检查</span>
            <span v-else>检验</span>
        </template>

      </el-table-column>


      <el-table-column label="费用" prop="fee">
      </el-table-column>
      <el-table-column label="状态" prop="status">
        <template slot-scope="scope">

            <el-tag type="success" v-if="scope.row.status == 1">代收费</el-tag>
            <el-tag type="info" v-else-if="scope.row.status == 2">待检查</el-tag>
            <el-tag type="warning" v-else-if="scope.row.status == 3">已检查</el-tag>
            <el-tag type="danger" v-else>已退费</el-tag>
        </template>
      </el-table-column>

    </el-table>


    <el-row :gutter="10"  style="margin: 25px 0 15px 0; ">
      <el-col :span="24" style="font-size: 12px;color: #909399;font-weight: bold;">
        应退金额: &nbsp;&nbsp;{{amount}} 元
      </el-col>

    </el-row>


  </div>


</template>

<script>
  export default {
    name: 'Refund',
    components: {

    },
    data() {
      return {

        tableData: [],

        search: {
          registerId: ''
        },
        register: {
           name: '',
           gender: '',
           idno: ''
        },
        selectRow:[],
        checkApplyIds: [],
        inspectApplyIds: []
      }
    },
    methods: {
      select(selection, row) {

        if(row.status != 2){
          this.$refs['tab'].toggleRowSelection(row,false)
        }
      },
      handleSelectionChange(rows) {
        // this.selectRow = rows;
        this.selectRow = []
        this.checkApplyIds = []
        this.inspectApplyIds = []
        console.log(rows);
        for(let i =0 ;i<rows.length ;i++){
          //console.log(rows[i].status == 1)
          if(rows[i].status == 2){
             this.selectRow.push(rows[i])
             if(rows[i].itemType == 1){
                this.checkApplyIds.push(rows[i].id)
             }else{
                this.inspectApplyIds.push(rows[i].id)
             }
          }else{
              this.$refs['tab'].toggleRowSelection(rows[i],false)
          }
        }
        // if(row.status != 1){
        //   this.$refs['tab'].toggleRowSelection(row,false)
        // }
      },
      searchData() {
          //根据病历号查询 患者及费用项目
           this.axios.get('/register/showFee' , response =>{
             console.log(response.obj);
             //1处理挂号数据
             if(response.obj.register){
               this.register = response.obj.register
             }else{
               this.register = {
                 name: '',
                 gender: null,
                 idno: ''
               }
               this.$message("根据病历号未查询到挂号信息")
             }


            this.tableData = []
             //2 将检查的项目添加到表格中
            if(response.obj.checkApplyList && response.obj.checkApplyList.length != 0){
              for(let i = 0 ; i< response.obj.checkApplyList.length ; i++){
                 let checkApply = response.obj.checkApplyList[i]
                 this.tableData.push(   {
                    id:checkApply.id,
                    itenName:checkApply.itemName,
                    itemType:1,
                    fee:checkApply.fee,
                    status:checkApply.status
                    })
              }
            }

            //3 将检验的项目添加到表格中
            if(response.obj.inspectApplyList && response.obj.inspectApplyList.length != 0){
              for(let i = 0 ; i< response.obj.inspectApplyList.length ; i++){
                 let inspectApply = response.obj.inspectApplyList[i]
                 this.tableData.push({
                    id:inspectApply.id,
                    itenName:inspectApply.itemName,
                    itemType:2,
                    fee:inspectApply.fee,
                    status:inspectApply.status
                    })
              }
            }



           },{
            registerId:this.search.registerId
           })

      },
      refund() {
        this.axios.post('/register/refund',resposne =>{
            console.log(resposne.obj)
            if(resposne.obj){
              this.searchData()
            }
        },{
          checkApplyIds:this.checkApplyIds,
          inspectApplyIds:this.inspectApplyIds,
        })
      }
    },
    computed:{
      amount(){
        let sum = 0;
        for(let i =0 ;i<this.selectRow.length ; i++){
          sum += this.selectRow[i].fee
        }
        return sum;
      }
    },
    created() {}
  }
</script>

<style scoped>
  .register{
    margin-top: 15px 0 5px 0;

  }



</style>
