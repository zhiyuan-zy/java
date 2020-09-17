<template>

    <el-form ref="form1" :model="form" label-width="120px" size="mini">

      <el-form-item>

        <el-col :span="8">
          <el-button type="primary" plain @click="submit">确诊</el-button>
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


      <el-form-item label="确认疾病">
        <el-input type="textarea" v-model="form.disease"></el-input>
      </el-form-item>

     <el-form-item label="处置方案">
        <el-input type="textarea" v-model="form.suit"></el-input>
      </el-form-item>
      <el-form-item label="药品清单">
        <el-input type="textarea" v-model="form.drug"></el-input>
      </el-form-item>


    </el-form>

</template>

<script>
  export default {
    name: 'Diagnosis',
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
            disease: '',
            suit: '',
            drug: '',
        }

      }

    },
    methods: {
      submit() {
        //当通过验证
        if(this.register){

            //form表单校验

            //更新页面上的值到 持久
            this.axios.post('/doctor/regist-submit', response => {
            },this.form,"确诊完成")
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

         this.form.disease 	    =  val1.disease
         this.form.suit 	    =  val1.suit
         this.form.drug      =  val1.drug

      }
    }
  }
</script>

<style>
</style>
