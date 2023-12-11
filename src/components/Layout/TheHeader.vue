<template>
  <div>
    <el-header class="header" style="background: crimson; height: 100px">
      <div class="header-left">
        <svg
          class="header-logo"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 10 50 25"
        >
          <path
            fill="maroon"
            d="M 16.71875 5 L 0 22 L 4.7480469 22 L 19.074219 7.4003906 L 33.398438 22 L 50 22 L 33.28125 5 L 16.71875 5 z M 19.074219 11.361328 L 9.0429688 22.076172 L 9.0429688 32.150391 C 9.0429688 33.681391 10.298125 34.9375 11.828125 34.9375 L 23.783203 34.9375 L 33 44.917969 L 33 34.9375 L 38.171875 34.9375 C 39.702875 34.9375 40.957031 33.682344 40.957031 32.152344 L 40.957031 25 L 32.261719 25 L 19.074219 11.361328 z"
          />
        </svg>
        <p class="logo-text">My World</p>
      </div>
      <div class="header-right">
        <div class="nav-buttons" style="">
          <el-button type="primary" size="x-small" circle>Items</el-button>
          <el-button type="success" size="x-small" circle>Recipes</el-button>
          <router-link to="/health-page">
            <el-button type="warning" size="x-small" circle style="width: 120%"
              >Health</el-button
            >
          </router-link>
        </div>
        <el-button
          @click="drawer = true"
          style="
            background-color: crimson;
            color: white;
            font-size: 36px;
            margin-left: 13px;
            margin-top: 18px;
            margin-right: -20px;
            border-color: crimson;
          "
          size="small"
          icon="el-icon-s-operation"
          class="el-button-nav"
        ></el-button>
      </div>
      <el-drawer
        :visible.sync="drawer"
        :with-header="false"
        class="el-drawer.rtl"
      >
        <span>
          <div
            style="
              display: flex;
              align-items: center;
              padding: 0px;
              flex-direction: row;
              justify-content: center;
              margin-top: 0px;
              margin-left: 0px;
              height: 60px;
              background-color: crimson;
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 60 50"
              width="50"
              height="50"
              style="fill: #6457f0; margin-right: -6px"
            >
              <path
                fill="maroon"
                d="M 16.71875 5 L 0 22 L 4.7480469 22 L 19.074219 7.4003906 L 33.398438 22 L 50 22 L 33.28125 5 L 16.71875 5 z M 19.074219 11.361328 L 9.0429688 22.076172 L 9.0429688 32.150391 C 9.0429688 33.681391 10.298125 34.9375 11.828125 34.9375 L 23.783203 34.9375 L 33 44.917969 L 33 34.9375 L 38.171875 34.9375 C 39.702875 34.9375 40.957031 33.682344 40.957031 32.152344 L 40.957031 25 L 32.261719 25 L 19.074219 11.361328 z"
              />
            </svg>
            <h3 style="margin: 12px; color: white">My World</h3>
          </div>
          <el-menu
            style="
              background-color: midnightblue !important;
              height: 92% !important;
            "
          >
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
              <el-menu-item
                style="border-bottom: none"
                class="el-menu-item"
                index="3"
                ><i class="el-icon-shopping-cart-full"></i>Shopping
                Cart</el-menu-item
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
          </el-menu></span
        >
      </el-drawer>
    </el-header>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      drawer: false,
    };
  },
  methods: {},
};
</script>

<style scoped>
.el-drawer.ltr,
.el-drawer.rtl {
  height: 96% !important;
  top: 0;
  bottom: 0;
}
.el-menu {
  border-right: none;
  list-style: none;
  position: relative;
  margin: 0;
  padding-left: 10px;
  color: #202020;
  line-height: 10vh;
  background-color: gainsboro;
}
.el-menu-item:hover {
  background: unset;
  display: -webkit-inline-box;
}
.el-menu-item {
  color: white;
  font-size: medium;
  padding-left: 0px !important;
}
.el-menu-item.is-active {
  color: none;
  width: 100%;
}
.el-menu-item[data-v-7fee856e] {
  color: white;
  font-size: medium;
  display: flex;
  padding-left: 0px !important;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.el-menu-item [class^="el-icon-"] {
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 18px;
  vertical-align: middle;
  margin-top: -4px;
  color: #6457f0 !important;
  opacity: 80%;
}
.el-button + .el-button,
.el-checkbox.is-bordered + .el-checkbox.is-bordered {
  margin-left: 0px;
}
.el-button.is-circle {
  border-radius: 30px;
  width: 35%;
}
.header {
  justify-content: space-between;
}
.el-drawer.rtl {
  width: min-content !important;
  font-family: sans-serif;
}
.el-drawer__body {
  flex: 1;
  overflow: auto;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.24);
  height: 60px;
}
.header-left {
  display: flex;
  align-items: center;
  height: 53px;
}
.header-right {
  display: flex;
  margin-top: -47px;
  justify-content: flex-end;
}
.el-button--primary {
  color: #fff;
  background-color: firebrick;
  border-color: crimson;
}
.el-button--success {
  color: #fff;
  background-color: firebrick;
  border-color: crimson;
}
.el-button--warning {
  color: #fff;
  background-color: firebrick;
  border-color: crimson;
}
.header-logo {
  width: 55px;
  height: 79px;
  margin-right: 4px;
  margin-left: 2px;
  margin-top: 40px;
}
.logo-text {
  font-size: 1em;
  font-weight: bold;
  color: white;
  margin-left: 8px;
  width: max-content;
  margin-top: 54px;
}
.el-button-nav {
  background-color: #f9f9f9;
}
.nav-buttons {
  display: flex;
  align-items: flex-end; /* Align the nav-buttons to the bottom of the container */
  justify-content: space-evenly;
  width: 250px;
  margin-bottom: 10px;
}
@media screen and (max-width: 520px) {
  .header {
    flex-direction: column;
    height: auto;
    padding: 20px;
    background-color: #f9f9f9;
    align-items: flex-start; /* Align items to the start in mobile view */
  }
  .header-logo {
    display: none;
  }
  .logo-text {
    display: none;
  }
  .header-right {
    margin-top: 20px;
  }
  .nav-buttons {
    flex-direction: column;
    margin-top: 20px;
  }
  .nav-buttons[data-v-7fee856e] {
    flex-direction: row;
    margin-top: 22px;
  }
  .header-right[data-v-7fee856e] {
    margin-top: -68px;
  }
}
</style>
