<template>
  <div class="header-right">
    <el-dropdown split-button type="default" @click="handleClick">
      Settings
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>Action 1</el-dropdown-item>
        <el-dropdown-item>Action 2</el-dropdown-item>
        <el-dropdown-item>Action 3</el-dropdown-item>
        <el-dropdown-item>Action 4</el-dropdown-item>
        <el-dropdown-item>Action 5</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
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
    handleClick() {
      alert("button click");
    },
  },
};
</script>
<style scoped>
.el-dropdown {
  vertical-align: top;
}
.header-right {
  margin-top: 7px;
  display: flex;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-dropdown .el-button-group {
  display: flex;
  flex-direction: row;
  margin-bottom: 7px;
  margin-right: -12px;
}
</style>
