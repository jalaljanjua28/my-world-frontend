<template>
  <div>
    <el-input
      v-model="itemName"
      placeholder="NonFood Item Name"
      class="input-with-select"
    >
      <el-button @click="addItem" slot="append" icon="el-icon-plus"></el-button>
    </el-input>
    <base-card>
      <el-table :data="items" style="width: 100%">
        <el-table-column label="Image">
          <template slot-scope="scope">
            <img
              :src="scope.row.image"
              :alt="scope.row.name"
              style="max-width: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column label="Name" prop="name" />
        <el-table-column label="Price" prop="price" />
        <el-table-column label="Status" prop="status" />
        <el-table-column label="Purchase/Expiry" prop="date">
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
          this.$message.success(data.message);
          this.itemName = ""; // Clear the input field
        })
        .catch((error) => {
          console.error("Error:", error);
          this.$message.error("An error occurred");
        });
    },
    deleteItem(itemToDelete) {
      fetch("https://my-world-app-7nnip2tiwq-as.a.run.app/removeItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemName: itemToDelete.name }),
      })
        .then((response) => {
          if (response.status === 200) {
            this.$message.success("Item deleted");
            console.log(`Item '${itemToDelete.name}' deleted successfully.`);
            this.$emit("item-deleted", itemToDelete);
          } else {
            console.error("Error deleting item.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          this.$message.error("An error occurred");
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
.input-with-select .el-input-group__prepend {
  background-color: #fff;
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
