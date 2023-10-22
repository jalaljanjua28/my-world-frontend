<template>
  <div>
    <el-input
      v-model="itemName"
      placeholder="Food Item Name"
      class="input-with-select"
    >
      <el-button @click="addItem" slot="append" icon="el-icon-plus"></el-button>
    </el-input>
    <base-card>
      <el-header>
        <h1 class="header-title">Shopping List</h1>
      </el-header>
      <el-table :data="items" style="width: 100%">
        <el-table-column label="Image" prop="image">
          <template slot-scope="scope">
            <img
              :src="scope.row.image"
              :alt="scope.row.name"
              style="max-width: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column label="Name" prop="name"></el-table-column>
        <el-table-column label="Price" prop="price"></el-table-column>
        <el-table-column label="Status" prop="status"></el-table-column>
        <el-table-column label="Purchase/Expiry">
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>
            <br />
            <span>{{ scope.row.expiry }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Actions">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="x-small"
              @click="addToCart(scope.row)"
              >Add to Cart</el-button
            >
            <el-button
              type="danger"
              size="x-small"
              @click="deleteItem(scope.row)"
              >Delete Item</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </base-card>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      itemName: "",
      selectOptions: [],
    };
  },

  methods: {
    addItem() {
      fetch("https://my-world-app-7nnip2tiwq-as.a.run.app/addItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemName: this.itemName }),
      })
        .then((response) => response.json())
        .then((data) => {
          this.$message({
            message: data.message,
            type: "success",
          });
          this.itemName = ""; // Clear the input field
        })
        .catch((error) => {
          console.error("Error:", error);
          this.$message({
            message: "An error occurred",
            type: "error",
          });
        });
    },
    deleteItem(itemToDelete) {
      // Send a request to your backend to delete the item by its name
      fetch("https://my-world-app-7nnip2tiwq-as.a.run.app/removeItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemName: itemToDelete.name }),
      })
        .then((response) => {
          if (response.status === 200) {
            this.$message({
              message: "Item deleted",
              type: "success",
            });
            // Item deleted successfully, update UI or show a message
            console.log(`Item '${itemToDelete.name}' deleted successfully.`);
            // Remove the item from the items array
            this.$emit("item-deleted", itemToDelete);
          } else {
            // Item not found or other error, handle accordingly
            console.error("Error deleting item.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          this.$message({
            message: "An error occurred",
            type: "error",
          });
        });
    },
  },
};
</script>

<style scoped>
.el-input-group__append .el-button,
.el-input-group__append .el-select,
.el-input-group__prepend .el-button,
.el-input-group__prepend .el-select {
  display: inline-block;
  margin: -16px -10px;
}
.el-table td.el-table__cell div {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.el-select .el-input {
  width: 110px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.el-checkbox.is-bordered + .el-checkbox.is-bordered {
  margin-left: 0px;
  margin-top: 10px;
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
  margin: 10px;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}
</style>
