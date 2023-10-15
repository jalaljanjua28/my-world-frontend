<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item>
      <router-link to="/">
        <el-button type="primary" icon="el-icon-arrow-left">Back</el-button>
      </router-link>
    </el-breadcrumb-item>
    <el-table :data="tableData" style="width: 100%; margin-top: 80px">
      <el-table-column fixed prop="date" label="Date" width="150">
      </el-table-column>
      <el-table-column prop="name" label="Name" width="120"> </el-table-column>
      <el-table-column prop="status" label="Status" width="120">
      </el-table-column>
      <el-table-column prop="price" label="Price" width="120">
      </el-table-column>
      <el-table-column fixed="right" label="Operations" width="120">
        <template>
          <el-button @click="handleClick" type="text" size="small"
            >Detail</el-button
          >
          <el-button type="text" size="small">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-breadcrumb>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      name: "",
      category: "",
      description: "",
      price: "",
    };
  },
  // created() {
  //   this.tableData = [...this.Food, ...this.notFood];
  // },
};
</script>

<style>
.el-icon-arrow-right {
  display: none;
}
</style>
