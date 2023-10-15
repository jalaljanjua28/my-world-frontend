<template>
  <div>
    <footer class="footer1">
      <div class="container">
        <el-row :gutter="20">
          <el-col :span="8">
            <h4>About Us</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </el-col>
          <el-col :span="8">
            <h4>Contact</h4>
            <p>123 Street, City</p>
            <p>Phone: 123-456-7890</p>
          </el-col>
          <el-col
            :span="8"
            style="
              padding-left: 10px;
              padding-right: 10px;
              align-content: center;
              flex-direction: column;
              line-height: 10px;
            "
          >
            <h4>Follow Us</h4>
            <p>Linkedin</p>
            <p>Twitter</p>
            <p>Facebook</p>
            <p>Instagram</p>

            <div class="social-icons">
              <i class="fab fa-facebook"></i>
              <i class="fab fa-twitter"></i>
              <i class="fab fa-instagram"></i>
            </div>
          </el-col>
        </el-row>
      </div>
    </footer>
    <footer class="footer2">
      <el-row class="el-button-footer">
        <router-link to="items-inventory">
          <el-button
            icon="el-icon-goods"
            style="
              font-size: x-large;
              background-color: #6457f0 !important;
              border: none;
              color: white !important;
            "
          ></el-button
        ></router-link>
        <router-link to="barcode-scan">
          <el-button
            icon="el-icon-camera"
            style="
              font-size: x-large;
              background-color: #6457f0 !important;
              border: none;
              color: white !important;
            "
          ></el-button
        ></router-link>
        <router-link to="shopping-cart">
          <el-button
            icon="el-icon-box"
            style="
              font-size: x-large;
              background-color: #6457f0 !important;
              border: none;
              color: white !important;
            "
          ></el-button
        ></router-link>
      </el-row>
    </footer>
  </div>
</template>

<script>
export default {
  components: {},
  methods: {
    addProduct() {
      // Code to add product
    },
    scanToAdd() {
      // Code to scan and add product
    },
    removeProduct() {
      // Code to remove product
    },
    searchProduct() {
      // Code to search for product
    },
  },
};
</script>

<style scoped>
[class*=" el-icon-"],
[class^="el-icon-"] {
  font-family: element-icons !important;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  vertical-align: baseline;
  display: flex !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  flex-direction: column !important;
  align-items: center !important;
}
.footer1 {
  height: auto !important;
  line-height: 15px;
  background-color: #f9f9f9;
  padding: 5px 0;
  color: #202020;
  text-align: center;
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  font-family: sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

h4 {
  font-weight: bold;
  font-size: 17px;
}
p {
  font-size: 12px;
}
.social-icons i {
  font-size: 24px;
  margin-right: 10px;
}
@media screen and (max-width: 520px) {
  .footer1 {
    display: none;
  }
}
.el-button-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}
.el-button--success {
  color: #202020;
  background-color: #f9f9f9;
  border-color: #c9c9c9 !important;
}
.el-button--default {
  color: #202020;
  background-color: #f9f9f9 !important;
}
.el-button--primary {
  color: #202020;
  background-color: #f9f9f9;
  border-color: #c9c9c9 !important;
  border: 1px solid #dcdfe6;
}
.el-button--info {
  color: #202020;
  background-color: #f9f9f9;
}
.el-button--warning {
  color: #202020;
  background-color: #f9f9f9;
}
.footer2 {
  height: 80px;
  line-height: 70px;
  background-color: #6457f0;
  padding: 5px 0;
  color: #fff;
  text-align: center;
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: small;
}
.el-button.is-circle {
  border-radius: 0%;
  padding: 10px;
}
.search-input {
  width: 200px;
  margin-left: 10px;
}
@media screen and (min-width: 520px) {
  .footer2 {
    display: none;
  }
}
</style>
