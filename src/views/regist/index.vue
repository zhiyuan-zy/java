<template>
  <div>
    <el-form ref="form" :model="form" label-width="100px" size="mini">
      <el-row>
        <el-col :span="6">
          <el-form-item label="病历号" prop="id">
            <el-input v-model="id" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="性别" prop="gender">
            <el-select v-model="form.gender" placeholder="请选择性别">
              <el-option v-for="item in genderOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="年龄" prop="age">
            <el-input v-model="form.age"></el-input>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row>
        <el-col :span="6">
          <el-form-item label="出生日期" prop="birthday">
            <el-date-picker v-model="form.birthday"
            value-format="yyyy-MM-dd"
            type="date" style="width: 160px;" placeholder="选择出生日期">
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="身份证号" prop="idno">
            <el-input v-model="form.idno"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="10">
          <el-form-item label="家庭住址" prop="address">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="挂号级别" prop="regsitLevelId">
            <el-select v-model="form.regsitLevelId" placeholder="请选择级别" @change="regsitlevelChange()">
              <el-option v-for="item in regsitLevelOptions" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="挂号科室" prop="deptId">
            <el-select v-model="form.deptId" placeholder="请选择科室" @change="deptChange()">
              <el-option v-for="item in deptOptions" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="挂号医生" prop="doctorId">
            <el-select v-model="form.doctorId" placeholder="请选择医生">
              <el-option v-for="item in doctorOptions" :key="item.id" :label="item.realname" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>



      </el-row>
      <el-col :span="6">
        <el-form-item label="看诊日期" prop="visittime">
            <el-date-picker v-model="form.visittime"
              value-format="yyyy-MM-dd"
              type="date" style="width: 160px;" placeholder="选择看诊日期">
            </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="是否要病历本" prop="book">
          <el-radio-group v-model="form.book" size="mini" @change="fee">
            <el-radio-button label="0">否</el-radio-button>
            <el-radio-button label="1">是</el-radio-button>
          </el-radio-group>

        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="应收金额" prop="fee">
          <el-input v-model="form.fee" disabled></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item>
          <el-button type="primary" plain @click="save">挂号</el-button>
        </el-form-item>
      </el-col>
      </el-row>



    </el-form>

    <el-row class="titleRow">
      <el-col :span="24">
        <div class="title">已挂号列表</div>
      </el-col>
    </el-row>


    <RegistList :key="showNum">   </RegistList>


  </div>
</template>

<script>
  import RegistList from '@/views/regist/regist_list'

  export default {
    name: 'Regist',
    components: {
      RegistList
    },
    data() {
      return {
        showNum: 1,
        id: 0,
        form: {
          name: '',
          gender: null,
          idno: '',
          birthday: '',
          age: '',
          address: '',
          visittime: null,
          regsitLevelId: null,
          deptId: null,
          doctorId: null,
          book: 0,
          fee: 0
        },

        genderOptions: [{
            label: '男',
            value: 1
          },
          {
            label: '女',
            value: 2
          },
          {
            label: '未知',
            value: 3
          },
        ],
        regsitLevelOptions: [],
        deptOptions: [],
        doctorOptions: []


      }
    },
    methods: {
      queryDoctor() {
        if (this.form.regsitLevelId && this.form.deptId) {
          this.axios.get('/ums-user/list', response => {
            this.doctorOptions = response.obj
            console.log(response.obj);
          }, {
            withPage: 0,
            active: 1,
            registlevel: this.form.regsitLevelId,
            deptId: this.form.deptId
          })
        }
      },
      regsitlevelChange() {
        this.queryDoctor()
        this.fee();
      },
      fee() {
        if (this.form.regsitLevelId) {
          for (let i = 0; i < this.regsitLevelOptions.length; i++) {
            if (this.regsitLevelOptions[i].id === this.form.regsitLevelId) {
              this.form.fee = this.regsitLevelOptions[i].fee;
              if(this.form.book == 1){
                this.form.fee =  this.form.fee + 1 ;
              }
              break;
            }
          }
        }
      },
      deptChange() {
        this.queryDoctor()
      },
      save() {
        this.axios.post('/register/regist',response => {
            console.log(response)
            if(response.code == 200){
              this.showNum = this.showNum +1;
              this.clearForm();
            }
        },this.form)
      },
      clearForm() {
        this.form = {
            name: '',
            gender: null,
            idno: '',
            birthday: '',
            age: '',
            address: '',
            regsitLevelId: null,
            deptId: null,
            doctorId: null,
            book: 0,
            fee: 0
        }
      }
    },
    created() {
      //获取最新的病历号
      this.axios.get('/register/maxNum', response => {
        this.id = response.obj;
      })

      //查询所有的挂号级别 有效
      this.axios.get('/regist-level/list', response => {
        this.regsitLevelOptions = response.obj;
      }, {
        withPage: 0,
        active: 1
      })
      //查询所有的科室
      this.axios.get('/department/list', response => {
        this.deptOptions = response.obj;

      }, {
        withPage: 0,
        active: 1
      })
    }
  }
</script>

<style scoped>

  .titleRow{
    margin-top: 20px;
  }


  .title{
    background: #afbfa5;
    text-align: left;
    align:left
  }

</style>
