<template>
  <div>
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="权限名"  prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="请求地址"  prop="url">
        <el-input v-model="form.url"></el-input>
      </el-form-item>
      <el-form-item label="类别"  prop="type">
        <el-radio-group v-model="form.type" size="small">
          <el-radio-button :label="0">目录</el-radio-button>
          <el-radio-button :label="1">按钮</el-radio-button>
          <el-radio-button :label="2">页面</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="save">保存数据</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'RoleEdit',
    props: ['editid','parentId'],
    data() {
      return {
        form: {
          name: '',
          url: '',
          type: 1,
          parentId: 0
        },
        rules: {
          name: [
            { required: true,message: '权限名不能为空', trigger: 'blur'},
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ],
          url: [
            // { required: true,message: '请求地址不能为空', trigger: 'blur'},
            { min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }
          ],
          type: [
            { required: true,message: '权限类别不能为空', trigger: 'blur'},
          ]
        },
        url: '/ums-permission/add'
      }
    },
    created() {
      if(this.editid) {
        // 如果是修改 提交地址变成修改的提交地址
        this.url = '/ums-permission/update'
        // 通过id 读原始数据
        this.axios.get('/ums-permission/getById',response => {
          this.form = response.obj
          delete this.form['children']
          console.log(this.form)
        },{id:this.editid})
      } else {
        this.form.parentId = this.parentId
      }
    },
    methods:{
      save() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.axios.post(this.url,response => {
              // 子组件要改变父组件的值
              this.$emit('update:show',false)
              this.$emit('getData')
            },this.form)
          }
        })
      }
    }
  }
</script>

<style>
</style>
