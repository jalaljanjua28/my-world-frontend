<template>
  <div>
    <el-breadcrumb-item>
      <router-link to="/">
        <el-button icon="el-icon-caret-left">Back</el-button>
      </router-link>
    </el-breadcrumb-item>
    <el-container class="order-page">
      <el-header>
        <h1 class="header-title" style="margin-top: 60px">My Orders</h1>
      </el-header>
      <el-main>
        <el-table :data="orders" class="order-table" stripe style="width: 100%">
          <el-table-column prop="orderId" label="Order ID" />
          <el-table-column prop="product" label="Product" />
          <el-table-column prop="quantity" label="Quantity" />
          <el-table-column prop="status" label="Status" />
          <el-table-column prop="date" label="Date" />
          <el-table-column label="Actions" width="100">
            <template slot-scope="scope">
              <el-button
                size="small"
                type="text"
                @click="handleViewOrder(scope.row)"
              >
                View
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: [
        {
          orderId: "12345",
          product: "Product 1",
          quantity: 2,
          status: "Delivered",
          date: "2022-12-01",
        },
        {
          orderId: "56789",
          product: "Product 2",
          quantity: 1,
          status: "Pending",
          date: "2022-11-30",
        },
      ],
    };
  },
  methods: {
    handleViewOrder() {
      // code to view order details
    },
  },
};
</script>

<style scoped>
.order-page {
  height: 100%;
}

.header-title {
  text-align: center;
}

.order-table {
  margin-top: 60px;
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
</style>
