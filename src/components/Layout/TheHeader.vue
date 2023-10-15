<template>
  <div>
    <el-header class="header" style="height: 60px">
      <el-col
        :xs="24"
        :sm="24"
        :lg="24"
        style="display: inline-flex; align-items: stretch"
        ><el-button
          @click="drawer = true"
          style="margin-right: 16px; background-color: #f9f9f9"
          size="small"
          icon="el-icon-more"
          class="el-button-nav"
        >
        </el-button>
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
                flex-direction: column;
                justify-content: space-around;
                margin-top: 7px;
                margin-left: 0px;
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
                  fill="#6457F0"
                  d="M 16.71875 5 L 0 22 L 4.7480469 22 L 19.074219 7.4003906 L 33.398438 22 L 50 22 L 33.28125 5 L 16.71875 5 z M 19.074219 11.361328 L 9.0429688 22.076172 L 9.0429688 32.150391 C 9.0429688 33.681391 10.298125 34.9375 11.828125 34.9375 L 23.783203 34.9375 L 33 44.917969 L 33 34.9375 L 38.171875 34.9375 C 39.702875 34.9375 40.957031 33.682344 40.957031 32.152344 L 40.957031 25 L 32.261719 25 L 19.074219 11.361328 z"
                />
              </svg>
              <h3 style="margin: 0; color: #202020">My World</h3>
            </div>
            <el-menu style="background-color: #f9f9f9">
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
                  ><i class="el-icon-takeaway-box"></i>Order
                  History</el-menu-item
                ></router-link
              >
              <router-link to="/items-inventory" style="text-decoration: none">
                <el-menu-item
                  style="border-bottom: none"
                  class="el-menu-item"
                  index="14"
                  ><i class="el-icon-fork-spoon"></i>Items
                  Inventory</el-menu-item
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
      </el-col>
      <the-menu></the-menu>
    </el-header>
  </div>
</template>

<script>
import TheMenu from "../UI/TheMenu.vue";

export default {
  components: {
    TheMenu,
  },
  data() {
    return {
      drawer: false,
    };
  },
  methods: {},
};
</script>

<style>
.el-menu-item [class^="el-icon-"] {
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 18px;
  vertical-align: middle;
  margin-top: -4px;
  color: #6457f0 !important;
  opacity: 50%;
}
.el-drawer.rtl {
  width: min-content !important;
  font-family: sans-serif;
}
.el-drawer__body {
  flex: 1;
  overflow: auto;
  background-color: #f9f9f9;
}

.header-left {
  display: flex;
  align-items: center;
  margin-right: 22px;
  background-color: #f9f9f9;
  width: 100%;
}
.header-logo {
  width: 59px;
  height: 79px;
  margin-right: 4px;
  margin-left: 2px;
}
.logo-text {
  font-size: 1em;
  font-weight: bold;
  color: #202020;
  margin-left: 8px;
  width: max-content;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.24);
  height: 60px;
}

@media screen and (min-width: 520px) {
  .el-button-nav {
    display: none;
  }
  .header {
    display: none;
  }
}
@media screen and (max-width: 520px) {
  .header-left {
    display: flex;
    align-items: center;
    margin-right: 0px;
  }
  .header-logo {
    display: none;
  }
  .logo-text {
    display: none;
  }
  .nav {
    display: none;
  }
  .header {
    flex-direction: unset;
    height: auto;
    padding: 20px;
    background-color: #f9f9f9;
  }
  .header-right {
    margin-top: 7px;
    display: flex;
  }
  .header-menu {
    width: 100%;
    background-color: #fff;
  }
  .el-menu .el-menu-item {
    color: #202020 !important;
  }
  .el-drawer {
    position: relative;
    box-sizing: border-box;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 0.2),
      0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    outline: 0;
  }
}
</style>
