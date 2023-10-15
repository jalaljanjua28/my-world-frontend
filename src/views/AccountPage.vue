<template>
  <div>
    <el-breadcrumb-item>
      <router-link to="/">
        <el-button icon="el-icon-caret-left">Back</el-button>
      </router-link>
    </el-breadcrumb-item>
    <el-container class="account-page">
      <el-header style="height: 0px">
        <h1 class="header-title">My Account</h1>
      </el-header>
      <el-main style="margin-top: 50px">
        <el-form class="account-form" :model="form" ref="form">
          <el-form-item label="Username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="Email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="Password">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateAccount"
              >Update Account</el-button
            >
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    updateAccount() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // API call to update account details
        }
      });
    },
  },
};
</script>

<style scoped>
.account-page {
  height: 100%;
}

.header-title {
  text-align: center;
  margin-top: 50px;
}

.account-form {
  padding: 20px;
}
.el-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: none;
  border: 0px solid #dcdfe6;
  color: #606266;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  padding: 11px 10px;
}
.el-button--primary {
  color: #fff !important;
  background-color: #409eff !important;
  border-color: #409eff !important;
}
</style>
