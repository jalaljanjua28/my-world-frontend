<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item>
        <router-link to="/">
          <el-button icon="el-icon-caret-left">Back</el-button>
        </router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <base-card>
      <el-container class="account-page">
        <el-header>
          <h1 class="header-title" style="margin-top: 50px">Enter Items</h1>
        </el-header>
        <el-form class="account-form" :model="newItem">
          <el-form-item label="Item Name">
            <el-input v-model="newItem.name" />
          </el-form-item>
          <el-form-item label="Category">
            <el-input v-model="newItem.category" />
          </el-form-item>
          <el-form-item label="Description">
            <el-input v-model="newItem.description" />
          </el-form-item>
          <el-form-item label="Price">
            <el-input v-model="newItem.price" type="number" />
          </el-form-item>
          <el-form-item>
            <el-button class="el-button" type="primary" @click="addItem"
              >Add Item</el-button
            >
          </el-form-item>
        </el-form>
        <el-header>
          <h1 class="header-title">Items Cart</h1>
        </el-header>
        <el-row>
          <el-col :span="24" offset="0">
            <el-card>
              <el-table :data="cartItems" border>
                <el-table-column prop="name" label="Name"></el-table-column>
                <el-table-column prop="price" label="Price"></el-table-column>
                <el-table-column
                  prop="category"
                  label="Category"
                ></el-table-column>
                <el-table-column
                  prop="description"
                  label="Description"
                ></el-table-column>
                <el-table-column label="Action">
                  <template slot-scope="scope">
                    <el-button type="danger" @click="removeFromCart(scope.row)"
                      >Remove</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <div class="total-price">Total: {{ totalPrice }}</div>
              <el-button type="primary" @click="checkout">Checkout</el-button>
            </el-card>
          </el-col>
        </el-row>
      </el-container>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Items: [],
      newItem: {
        name: "",
        category: "",
        description: "",
        price: "",
      },
      cartItems: [],
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce((acc, item) => acc + item.price, 0);
    },
  },
  methods: {
    addItem() {
      this.cartItems.push({
        name: this.newItem.name,
        category: this.newItem.category,
        price: this.newItem.price,
        description: this.newItem.description,
      });
      this.newItem = {
        name: "",
        category: "",
        description: "",
        price: 0,
      };
    },
    removeItem(item) {
      this.cartItems = this.cartItems.filter((i) => i !== item);
    },
    removeFromCart(item) {
      this.cartItems = this.cartItems.filter((i) => i !== item);
    },
    checkout() {
      alert("Checking out...");
    },
  },
};
</script>
<style scoped>
div[data-v-48bb6248] {
  margin: 1rem auto;
  max-width: 70%;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}
.el-header {
  height: 100px !important;
}
.account-page {
  height: 100%;
}

.header-title {
  text-align: center;
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
@media screen and (max-width: 520px) {
  .account-page {
    height: 100%;
  }

  .header-title {
    text-align: center;
  }

  .account-form {
    padding: 20px;
  }
  .el-container {
    flex: 1;
    flex-basis: auto;
    box-sizing: border-box;
    min-width: -2px;
    margin-right: 17px;
  }
}
</style>
