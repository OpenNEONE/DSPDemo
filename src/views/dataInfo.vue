<template>
  <div class="dataBasic">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="20"
        ><div class="grid-content ">
          <el-container>
            <el-header><Steps /></el-header>
            <el-col :span="14" :offset="5">
              <el-main>
                <el-form
                  ref="form"
                  :model="form"
                  label-width="80px"
                  label-position="left"
                >
                  <el-form-item label="应用">
                    <el-input v-model="form.App"></el-input>
                  </el-form-item>
                  <el-form-item label="数据类型">
                    <el-input v-model="form.dataType"></el-input>
                  </el-form-item>
                  <el-form-item label="数据获取方式" label-width="100px">
                    <el-checkbox-group v-model="form.type">
                      <el-checkbox
                        label="数据获取方式"
                        name="type"
                      ></el-checkbox>
                      <el-checkbox label="操作系统 " name="type"></el-checkbox>
                      <el-checkbox label="中间件" name="type"></el-checkbox>
                      <el-checkbox label="Oreacle" name="type"></el-checkbox>
                      <el-checkbox label="MySql" name="type"></el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                  <el-form-item label="性能容量数据" label-width="100px">
                    <el-checkbox-group v-model="form.sysData">
                      <el-radio label="CPU" name="type"></el-radio>
                      <el-radio label="内存" name="type"></el-radio>
                      <el-radio label="IP" name="type"></el-radio>
                    </el-checkbox-group>
                  </el-form-item>
                  <el-form-item label="活动时间" required>
                    <el-col :span="11">
                      <el-form-item prop="date1">
                        <el-date-picker
                          type="date"
                          placeholder="选择日期"
                          v-model="ruleForm.date1"
                          style="width: 100%"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                      <el-form-item prop="date2">
                        <el-time-picker
                          placeholder="选择时间"
                          v-model="ruleForm.date2"
                          style="width: 100%"
                        ></el-time-picker>
                      </el-form-item>
                    </el-col>
                  </el-form-item>
                   <el-form-item label="组合方式">
                    <el-input v-model="form.mergeType"></el-input>
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
        sysData: [],
        mergeType:""
      },
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change",
          },
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" },
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
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