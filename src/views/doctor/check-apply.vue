<template>
  <div>
        <el-form ref="form1" :model="form" label-width="120px" size="mini">


          <el-form-item>
            <el-col :span="8">
              <el-button type="primary" plain @click="show = true" >添加项目</el-button>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" plain @click="removeItem">删除项目</el-button>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" plain @click="save">开立检查</el-button>
            </el-col>

          </el-form-item>

          <el-form-item>

            <el-col :span="11">
              姓名 <el-input v-model="form.name" disabled></el-input>
            </el-col>
            <el-col class="line" :span="2">&nbsp;</el-col>
            <el-col :span="11">
              年龄 <el-input v-model="form.age" disabled></el-input>
            </el-col>
          </el-form-item>

        </el-form>
<!-- @selection-change="handleSelectionChange" -->
        <el-table ref="tab" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" size="mini" @select="selectRow">
          <el-table-column type="selection">
          </el-table-column>

          <el-table-column label="ID"  prop="itemId">
          </el-table-column>
          <el-table-column label="申请项目"  prop="itemName">
          </el-table-column>
          <el-table-column label="费用"  prop="fee">
          </el-table-column>
          <el-table-column label="开立状态"  prop="status">
            <template slot-scope="scope">
                <span v-if="scope.row.status == -1">
                  <el-tag type="success">未开立</el-tag>
                  </span>
                 <span v-else>已开立</span>
            </template>
          </el-table-column>


          </el-table>


        <el-dialog title="选择检查项目" :visible.sync="show" :close-on-click-modal="false" width="800px">
          <SelectCheck v-if="show" :show.sync="show"  @selectCheckItem="selectCheckItem" ></SelectCheck>
        </el-dialog>





  </div>
</template>

<script>
  import SelectCheck from '@/views/doctor/select-check'
  export default {
    name: 'CheckApply',
    props:[
      'register'
    ],
    components: {
      SelectCheck
    },
    data() {
      return {
        tableData: [],
        show: false,
        selectrow: [],
        form: {
          id: 0,
          name: '',
          age: 0
        }
      }
    },
    methods: {
      handleSelectionChange(rows) {
          this.selectrow = rows
      },
      selectCheckItem(checkItem) {
         let exists = false;
         for(let i = 0 ;i <this.tableData.length ;i++){
           if(this.tableData[i].itemId == checkItem.id){
             exists = true;
           }
         }
         if(!exists){
            this.tableData.push({
              itemId:checkItem.id,
              itemName: checkItem.name,
              fee: checkItem.fee,
              status: -1
            });
         }
      },
      save() {
        let itemId = [];
        for(let i = 0 ;i <this.tableData.length ;i++){
          if(this.tableData[i].status == -1){ //新添加的项目可以开立检查
           itemId.push(this.tableData[i].itemId)
          }
        }

        this.axios.post('/check-apply/save',response =>{
            this.getData()
        },{
          registerId:this.register.id,
          itemId:itemId
        })

      },
      getData() {
        //查询当前患者已申请的检查项目
        this.axios.post('/check-apply/list',resposne =>{
          this.tableData = resposne.obj

        },{
          registerId: this.form.id
        })

      },
      selectRow(selection, row) {
        console.log(row.itemName,row.status);
        if(row.status != -1){
          this.$refs['tab'].toggleRowSelection(row,false)
        }
      },
      removeItem() {
          for(let i =0 ;i<this.selectrow.length ;i++){
            let row = this.selectrow[i];

             for(let j=0 ;j<this.tableData.length; j++){
                if( this.tableData[j].itemId == row.itemId ){
                  console.log('准备删除 ：'+j)
                  this.tableData.splice(j,1)
                  break;
                }
             }

            console.log();
          }
      }
    },
    created() {


    },
    watch: {
      register(val1,val2){
        //console.log(val1,val2);
         this.form.id			=  val1.id
         this.form.name			=  val1.name
         this.form.age			=  val1.age
         if(this.form.id){
           this.getData()
         }
      }
    }
  }
</script>

<style>
</style>
