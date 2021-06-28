<template>
  <div class="dataBasic">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="20"
        ><div class="grid-content ">
          <el-container >
            <el-header><Steps /></el-header>
            <el-col :span="14"  :offset="5">
               <el-main>
              <el-form ref="form" :model="form" label-width="80px" label-position="left">
                <el-form-item label="申请人" >
                  <el-input v-model="form.name" ></el-input>
                </el-form-item>
                 <el-form-item label="联系人">
                  <el-input v-model="form.concat"></el-input>
                </el-form-item>
                <el-form-item label="活动性质">
                  <el-checkbox-group v-model="form.type">
                    <el-checkbox
                      label="数据获取方式"
                      name="type" 
                    ></el-checkbox>
                    <el-checkbox label="准实时kafka转发" name="type"></el-checkbox>
                    <el-checkbox label="定频kakka转发" name="type"></el-checkbox>
                    <el-checkbox label="联机接口" name="type"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item label="性能容量数据"  label-width="100px">
                  <el-radio-group v-model="form.perforence">
                    <el-radio label="生死指标"></el-radio>
                    <el-radio label="应用性能容量"></el-radio>
                    <el-radio label="关键性能容量"></el-radio>
                    <el-radio label="个性化性能容量"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="申请理由">
                  <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>

              </el-form>
            </el-main>
            </el-col>
            <el-footer> <el-button>保存</el-button></el-footer>
          </el-container>
        </div></el-col
      >
    </el-row>
  </div>
</template>

<script>
import Steps from "../components/Steps.vue";
import { getListAPI } from "../api";
export default {
  name: "dataBasic",
  components: {
    Steps,
  },
  created() {
    // this.getListAPI();
  },
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    };
  },
  methods: {
    getListAPI() {
      getListAPI("123")
        .then((res) => console.log("123"))
        .catch((err) => console.log("1231231231231"));
    },
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style lang="scss">
.el-header,
.el-footer {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>