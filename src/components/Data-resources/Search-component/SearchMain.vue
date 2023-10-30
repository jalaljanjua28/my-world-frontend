<template>
  <div class="search-container">
    <el-input
      v-model="searchQuery"
      placeholder="Search for items"
      class="search-input"
      @change="searchItems"
    />
    <div v-if="searchResults.length > 0" class="results-container">
      <table class="item-table">
        <tr
          v-for="(item, index) in searchResults"
          :key="index"
          class="item-row"
        >
          <td class="item-image">
            <img :src="item.image" :alt="item.image" />
          </td>
          <td class="item-details">
            <div class="item-name">Name: {{ item.name }}</div>
            <div class="item-price">Price: {{ item.price }}</div>
            <div class="item-status">Status: {{ item.status }}</div>
            <div class="item-dates">
              <div class="item-date">Purchase: {{ item.date }}</div>
              <div class="item-expiry">Days Left: {{ item.days_left }}</div>
            </div>
          </td>
          <td class="add-to-cart-button">
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
            ></el-button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      searchResults: [],
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
      fetch("https://my-world-app-7nnip2tiwq-as.a.run.app/removeItem/Master", {
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
    searchItems() {
      // Implement search logic here
      const searchValue = this.searchQuery.toLowerCase();

      this.searchResults = [
        ...this.Food.filter((item) =>
          item.name.toLowerCase().includes(searchValue)
        ),
        ...this.NonFood.filter((item) =>
          item.name.toLowerCase().includes(searchValue)
        ),
      ];

      this.searchQuery = "";
    },
  },
  props: {
    Food: Array,
    NonFood: Array,
  },
};
</script>

<style scoped>
.search-container {
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: column;
}

.search-input {
  flex-grow: 1;
}

.item-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.item-row {
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.item-image {
  width: 100px;
  padding: 10px;
}

.item-image img {
  max-width: 100%;
  height: auto;
}

.item-details {
  padding: 10px;
}

.item-name,
.item-price,
.item-status,
.item-dates,
.item-date,
.item-expiry {
  margin-bottom: 10px;
}

.add-to-cart-button {
  text-align: center;
  padding: 10px;
}

.add-to-cart-button button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 12px 16px;
  cursor: pointer;
}
.el-button--danger {
  color: #fff !important;
  background-color: #f56c6c !important;
  border-color: #f56c6c !important;
}
.el-button--success {
  color: #fff !important;
  background-color: #67c23a !important;
  border-color: #67c23a !important;
}
</style>
