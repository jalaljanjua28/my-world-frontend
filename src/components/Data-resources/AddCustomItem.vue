<template>
  <el-container class="add-item-container">
    <el-main>
      <el-form :model="form" label-width="120px">
        <el-form-item label="Item Name">
          <el-input v-model="form.item_name"></el-input>
        </el-form-item>
        <el-form-item label="Price">
          <el-input v-model="form.item_price"></el-input>
        </el-form-item>
        <el-form-item label="Item Date">
          <el-input v-model="form.item_date"></el-input>
        </el-form-item>
        <el-form-item label="Item Expiry">
          <el-input v-model="form.item_expiry"></el-input>
        </el-form-item>
        <el-form-item label="Item Status">
          <el-input v-model="form.item_status"></el-input>
        </el-form-item>
        <el-form-item label="Item Days Left">
          <el-input v-model="form.item_day_left"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="AddItem">Add Item</el-button>
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
        item_price: "",
        item_status: "",
        item_date: "",
        item_expiry: "",
        item_day_left: "",
      },
    };
  },
  methods: {
    AddItem() {
      const requestData = {
        item_name: this.form.item_name,
        item_price: this.form.item_price,
        item_status: this.form.item_status,
        item_date: this.form.item_date,
        item_expiry: this.form.item_expiry,
        item_day_left: this.form.item_day_left,
      };
      axios
        .post(
          "https://my-world-app-7nnip2tiwq-as.a.run.app/add-custom-item-shopping",
          requestData
        )
        .then((response) => {
          console.log(response.data);
          this.$emit("item-added", requestData); // Emit an event with the added item data
        })
        .catch((error) => {
          console.log(error);
        });
      this.form.item_name = "";
      this.form.item_price = "";
      this.form.item_status = "";
      this.form.item_date = "";
      this.form.item_expiry = "";
      this.form.item_day_left = "";
      location.reload();
    },
  },
};
</script>

<style scoped>
.add-item-title {
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

.add-item-container[data-v-0c2683b0] {
  width: 100%;
  margin: 0 auto;
  padding: 9px;
  display: flex;
  margin-left: -27px;
}
.el-form-item__label {
  line-height: 65px;
}
</style>
