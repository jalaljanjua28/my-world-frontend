<template>
  <el-container class="update-expiry-container">
    <el-header>
      <h1 class="update-expiry-title">Update Master Item Expiry</h1>
    </el-header>
    <base-card>
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
    </base-card>
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
      const requestData = {
        item_name: this.form.item_name,
        days_to_extend: this.form.days_to_extend,
      };
      axios
        .post("http://127.0.0.1:8081/update-master-item-expiry", requestData)
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

<style scoped>
.update-expiry-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.update-expiry-title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.el-form-item {
  margin-bottom: 15px;
}

.el-button {
  margin-top: 15px;
}
div[data-v-48bb6248] {
  width: -webkit-fill-available !important;
}
</style>
