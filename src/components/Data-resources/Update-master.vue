<template>
  <el-container>
    <el-header>
      <h1>Update Master Item Expiry</h1>
    </el-header>
    <el-main>
      <el-form :model="form" label-width="120px">
        <el-form-item label="Item Name">
          <el-input v-model="form.item_name"></el-input>
        </el-form-item>
        <el-form-item label="Days to Extend">
          <el-input v-model="form.days_to_extend" type="number"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateExpiry"
            >Update Expiry</el-button
          >
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        item_name: "",
        days_to_extend: "",
      },
    };
  },
  methods: {
    updateExpiry() {
      // Send a POST request to your server with form data
      const requestData = {
        item_name: this.form.item_name,
        days_to_extend: this.form.days_to_extend,
      };
      axios
        .post(
          "https://my-world-app-7nnip2tiwq-as.a.run.app/update-master-item-expiry",
          requestData
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      this.form.item_name = "";
      this.form.days_to_extend = "";
      location.reload();
    },
  },
};
</script>

<style>
.el-form-item__label {
  text-align: center !important;
  line-height: 65px !important;
}
</style>
