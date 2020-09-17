<template>

    <el-form ref="form1" :model="form" label-width="120px" size="mini">


      <el-form-item>
        <el-col :span="8">
          <el-button type="primary" plain >暂存</el-button>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" plain @click="submit">提交</el-button>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" plain >清空所有</el-button>
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


      <el-form-item label="主诉">
        <el-input type="textarea" v-model="form.readme"></el-input>
      </el-form-item>

     <el-form-item label="现病史">
        <el-input type="textarea" v-model="form.present"></el-input>
      </el-form-item>
      <el-form-item label="现病史治疗情况">
        <el-input type="textarea" v-model="form.presentTreat"></el-input>
      </el-form-item>
      <el-form-item label="既往史">
        <el-input type="textarea" v-model="form.history"></el-input>
      </el-form-item>
      <el-form-item label="过敏史">
        <el-input type="textarea" v-model="form.allergy"></el-input>
      </el-form-item>

    </el-form>

</template>

<script>
  export default {
    name: 'PaperHome',
    props: [
      'register'
    ],
    components: {

    },
    data() {

      return {
        options: [],
        form: {
            id: 0,
            name: '',
            age: 0,
            readme: '',
            present: '',
            presentTreat: '',
            history: '',
            allergy: ''
        }

      }

    },
    methods: {
      submit() {
        //当通过验证
        if(this.register){
            //更新页面上的值到 持久
            this.axios.post('/doctor/regist-submit', response => {
              // console.log(response.obj)
               this.$emit('update')
            },this.form)
        }else{
          this.$message("请选择患者")
        }
      }
    },
    created() {

    },
    watch:{
      register(val1,val2){
        //console.log(val1,val2);
         this.form.id			=  val1.id
         this.form.name			=  val1.name
         this.form.age			=  val1.age
         this.form.readme 	    =  val1.readme
         this.form.present      =  val1.present
         this.form.presentTreat =  val1.presentTreat
         this.form.history      =  val1.history
         this.form.allergy      =  val1.allergy
      }
    }
  }
</script>

<style>
</style>
