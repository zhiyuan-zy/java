<template>
  <div>
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">



      <el-form-item label="部门名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="办公地址" prop="address">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="负责人" prop="leader">
        <el-input v-model="form.leader"></el-input>
      </el-form-item>
      <el-form-item label="部门类型" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio-button label="1">医疗科室</el-radio-button>
          <el-radio-button label="0">非医疗科室</el-radio-button>
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
    name: 'DepartmentEdit',
    props: ['editid'],
    data() {
      return {
        form: {
          name: '',
          address: '',
          leader: '',
          type: 1
        },
        rules: {
          name: [{
              required: true,
              message: '类别名不能为空',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 100,
              message: '长度在 1 到 100 个字符',
              trigger: 'blur'
            }
          ]
        },
        url: '/department/add'
      }
    },
    created() {
      if (this.editid) {
        // 如果是修改 提交地址变成修改的提交地址
        this.url = '/department/update'
        // 通过id 读原始数据
        this.axios.get('/department/getById', response => {
          this.form.id = response.obj.id
          this.form.name = response.obj.name
          this.form.address = response.obj.address
          this.form.leader = response.obj.leader
          this.form.type = response.obj.type
        }, {
          id: this.editid
        })
      }
    },
    methods: {
      save() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.axios.post(this.url, response => {
              // 子组件要改变父组件的值
              this.$emit('update:show', false)
              this.$emit('getData')
            }, this.form)
          }
        })
      }
    }
  }
</script>

<style>
</style>
