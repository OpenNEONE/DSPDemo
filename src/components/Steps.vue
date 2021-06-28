<template>
  <div class="Steps">
    <el-steps :active="active" simple>
      <el-step title="基本信息" icon="el-icon-edit"></el-step>
      <el-step title="数据信息 " icon="el-icon-upload"></el-step>
      <el-step title="信息确认" icon="el-icon-picture"></el-step>

      <el-button
        type="primary"
        style="margin-top: 12px"
        @click="next"
        class="nextStep"
        >下一步</el-button
      >
    </el-steps>
  </div>
</template>

<script>
export default {
  name: "Steps",
  data() {
    return {
      active: 0,
    };
  },

  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
      switch (this.active){
        case 0 :this.$router.push({ path: `/` });
        break;
        case 1 : this.$router.push({ path: `/dataInfo` });
        break
        case 2 :this.$router.push({ path: `/dataConfirm` });
        default:;
        break

      }
   
      // else if(this.active == 3) {
      //    this.$router.push({ path: `dataConfirm` });
      // }
      console.log(this.active);
    },
  },
  computed: {},
};
</script>

<style lang="scss">
.nextStep {
  position: absolute;
  bottom: 1.5%;
  right: 38%;
}
</style>>
 
