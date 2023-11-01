<template>
  <div>
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
      <el-table-column label="DOE">
        <template slot-scope="scope">
          <span>{{ scope.row.date }}</span>
          <br />
          <span>{{ scope.row.expiry }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Days Left" prop="days_left"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-row>
            <el-button
              type="success"
              icon="el-icon-plus"
              circle
              size="x-small"
              @click="addItem(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="x-small"
              @click="deleteItem(scope.row)"
            ></el-button
          ></el-row>
        </template>
      </el-table-column>
    </el-table>
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
    addItem(itemToAdd) {
      fetch("http://127.0.0.1:8081/addItem/shopping", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemName: itemToAdd.name }),
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
      fetch("http://127.0.0.1:8081/removeItem/Master", {
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
  /* display: inline-block; */
  margin: -16px -10px;
}
.el-table td.el-table__cell div {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
}
.el-table th.el-table__cell > .cell {
  padding-right: 32px;
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
.el-button.is-circle {
  padding: 0px;
  width: 30px;
  line-height: 2.5;
  border-radius: 50%;
  /* background: none !important; */
}
.el-button--success {
  color: #fff !important;
  background-color: #67c23a !important;
  border-color: #67c23a !important;
}
.el-button--danger {
  color: #fff !important;
  background-color: #f56c6c !important;
  border-color: #f56c6c !important;
}
p {
  display: flex;
  justify-content: center;
  font-size: x-large;
}
</style>
