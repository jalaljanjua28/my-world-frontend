<template>
  <el-aside width="140px" class="nav">
    <div class="header-left">
      <svg
        class="header-logo"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 10 50 25"
      >
        <path
          fill="#6457F0"
          d="M 16.71875 5 L 0 22 L 4.7480469 22 L 19.074219 7.4003906 L 33.398438 22 L 50 22 L 33.28125 5 L 16.71875 5 z M 19.074219 11.361328 L 9.0429688 22.076172 L 9.0429688 32.150391 C 9.0429688 33.681391 10.298125 34.9375 11.828125 34.9375 L 23.783203 34.9375 L 33 44.917969 L 33 34.9375 L 38.171875 34.9375 C 39.702875 34.9375 40.957031 33.682344 40.957031 32.152344 L 40.957031 25 L 32.261719 25 L 19.074219 11.361328 z"
        />
      </svg>
      <p class="logo-text">My World</p>
    </div>
    <el-menu>
      <router-link to="/" style="text-decoration: none"
        ><el-menu-item
          style="border-bottom: none"
          class="el-menu-item"
          index="8"
          ><i class="el-icon-menu"></i>Homepage</el-menu-item
        ></router-link
      >
      <router-link to="/account-page" style="text-decoration: none"
        ><el-menu-item
          style="border-bottom: none"
          class="el-menu-item"
          index="9"
          ><i class="el-icon-user"></i>Account</el-menu-item
        ></router-link
      >
      <router-link to="/offer-list" style="text-decoration: none"
        ><el-menu-item
          style="border-bottom: none"
          class="el-menu-item"
          index="10"
        >
          <i class="el-icon-goods"></i>Offers</el-menu-item
        ></router-link
      >
      <router-link to="/recipe-page" style="text-decoration: none"
        ><el-menu-item
          style="border-bottom: none"
          class="el-menu-item"
          index="11"
          ><i class="el-icon-notebook-2"></i>Recipes</el-menu-item
        ></router-link
      >

      <router-link to="/shopping-cart" style="text-decoration: none">
        <el-menu-item style="border-bottom: none" class="el-menu-item" index="3"
          ><i class="el-icon-shopping-cart-full"></i>Shopping Cart</el-menu-item
        ></router-link
      >
      <router-link to="/orders-history" style="text-decoration: none">
        <el-menu-item
          style="border-bottom: none"
          class="el-menu-item"
          index="14"
          ><i class="el-icon-takeaway-box"></i>Order History</el-menu-item
        ></router-link
      >
      <router-link to="/items-inventory" style="text-decoration: none">
        <el-menu-item
          style="border-bottom: none"
          class="el-menu-item"
          index="14"
          ><i class="el-icon-fork-spoon"></i>Items Inventory</el-menu-item
        ></router-link
      >
      <router-link to="/barcode-scan" style="text-decoration: none">
        <el-menu-item
          style="border-bottom: none"
          class="el-menu-item"
          index="19"
          ><i class="el-icon-camera"></i>Barcode Scan</el-menu-item
        ></router-link
      ><router-link to="/about-us" style="text-decoration: none"
        ><el-menu-item
          style="border-bottom: none"
          class="el-menu-item"
          index="12"
          ><i class="el-icon-info"></i>About Us</el-menu-item
        ></router-link
      >
      <router-link to="/faqs-page" style="text-decoration: none"
        ><el-menu-item
          style="border-bottom: none"
          class="el-menu-item"
          index="13"
          ><i class="el-icon-question"></i>FAQs</el-menu-item
        ></router-link
      >
    </el-menu>
  </el-aside>
</template>

<style>
.el-container {
  font-family: sans-serif;
}
.el-menu {
  border-right: none;
  list-style: none;
  position: relative;
  margin: 0;
  padding-left: 0;
  color: #202020;
  line-height: 10vh;
  background-color: gainsboro;
}
.nav {
  min-height: 100%;
}
.el-menu-item:hover {
  outline: 0;
  background-color: none;
  width: 100%;
}
.el-menu-item {
  color: #202020;
  font-size: small;
  padding-left: 0px !important;
}
.el-menu-item.is-active {
  color: none;
  width: 100%;
}
.el-aside {
  overflow: auto;
  box-sizing: border-box;
  flex-shrink: 0;
  background-color: gainsboro;
}
</style>
