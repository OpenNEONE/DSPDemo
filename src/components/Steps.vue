<template>
  <div class="Steps">
    <el-steps :active="1" simple >
    <el-step title="步骤 1" icon="el-icon-edit"></el-step>
    <el-step title="步骤 2" icon="el-icon-upload"></el-step>
    <el-step title="步骤 3" icon="el-icon-picture"></el-step>

    <el-button style="margin-top: 12px" @click="next">下一步</el-button>
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
    },
  },
};
</script>

<style>
</style>