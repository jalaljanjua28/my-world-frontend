<template>
  <div class="header-right">
    <el-button
      @click="drawer = true"
      style="background-color: #f9f9f9"
      size="small"
      icon="el-icon-s-operation"
      class="el-button-nav"
    >
    </el-button>
    <el-button
      @click="drawer = true"
      style="background-color: #f9f9f9"
      size="small"
      icon="el-icon-set-up"
      class="el-button-nav"
    >
    </el-button>
    <el-button
      @click="drawer = true"
      style="background-color: #f9f9f9"
      size="small"
      icon="el-icon-folder"
      class="el-button-nav"
    >
    </el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style></style>
