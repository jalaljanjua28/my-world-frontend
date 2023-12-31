<template>
  <div>
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
      <el-table-column label="DOE" prop="date">
        <template slot-scope="scope">
          <span>{{ scope.row.date }}</span>
          <br />
          <span>{{ scope.row.expiry }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Days Left" prop="days_left"></el-table-column>
      <el-table-column label="Add Expiry"
        >"
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-plus"
            circle
            size="x-small"
            @click="addExpiry(scope.row)"
          ></el-button>
          <el-dialog :visible.sync="dialogVisible" title="Add Expiry">
            <el-form :model="form" label-width="120px">
              <el-form-item label="Item Name">
                <el-input v-model="form.item_name" disabled></el-input>
              </el-form-item>
              <el-form-item label="Days to Extend">
                <el-input
                  v-model="form.days_to_extend"
                  type="number"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="updateExpiry"
                  >Update Expiry</el-button
                >
              </el-form-item>
            </el-form>
          </el-dialog>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-row>
            <el-button
              type="success"
              icon="el-icon-check"
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
      dialogVisible: false, // Control the visibility of the dialog

      form: {
        item_name: "",
        days_to_extend: 0,
      },
    };
  },
  methods: {
    addItem(itemToAdd) {
      fetch("https://my-world-app-7nnip2tiwq-as.a.run.app/addItem/shopping", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemName: itemToAdd.name }),
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
      location.reload();
    },
    deleteItem(itemToDelete) {
      fetch("https://my-world-app-7nnip2tiwq-as.a.run.app/removeItem/Master", {
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
      location.reload();
    },
    addExpiry(item) {
      // Open the dialog to add expiry
      this.form.item_name = item.name; // Pre-fill item name in the form
      this.form.days_to_extend = 0;
      this.dialogVisible = true;
      // Reset days to extend
      // Show the dialog here (you might have a dialog component or use a modal library)
    },
    updateExpiry() {
      // Update the expiry date logic goes here
      fetch(
        "https://my-world-app-7nnip2tiwq-as.a.run.app/update-master-item-expiry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            item_name: this.form.item_name,
            days_to_extend: this.form.days_to_extend,
          }),
        }
      )
        .then((response) => {
          if (response.status === 200) {
            // Expiry updated successfully, handle accordingly
            this.$message({
              message: "Expiry updated",
              type: "success",
            });
            // Close the dialog here (if using a dialog component or modal library)
          } else {
            // Expiry update failed, handle accordingly
            console.error("Error updating expiry.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          this.$message({
            message: "An error occurred",
            type: "error",
          });
        });
      location.reload();
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
  width: 30px !important;
  line-height: 2 !important;
  border-radius: 50%;
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
