<template>
  <el-main class="main-content">
    <home-page></home-page>
    <br />
    <barcode-dummy class="barcode" ref="BarcodeDummy" />
  </el-main>
</template>

<script>
import BarcodeDummy from "@/views/BarcodeDummy.vue";
import HomePage from "../Data-resources/ItemFeatures/HomePage.vue";

export default {
  components: {
    BarcodeDummy,
    HomePage,
  },
  data() {
    return {};
  },
  mounted() {
    this.$refs.BarcodeDummy.simulateUpload();
    console.log("simulateUpload function triggered in BarcodeDummy.vue");
  },
  methods: {},
};
</script>

<style scoped>
.barcode {
  display: none;
}

.el-input__inner {
  height: 40px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: none;
  font-size: 14px;
  color: #333;
  padding: 0 7px;
  border: 1.5px solid #dcdfe6;
}

.el-input {
  position: relative;
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 20px;
  border: none;
  background-color: none;
}

/* Main content styles */
.main-content {
  background-color: #f0f2f5;
  min-height: 90vh;
  flex: 1;
}

@media screen and (max-width: 750px) {
  .el-carousel__container {
    width: 100% !important;
    height: 250px;
  }
  [class*="el-col-"] {
    box-sizing: border-box;
  }
}
@media screen and (max-width: 650px) {
  .el-carousel__container {
    width: 100% !important;
    height: 250px;
  }
}
@media screen and (max-width: 520px) {
  [class*="el-col-"] {
    float: none;
    box-sizing: border-box;
  }
  .section-title3 {
    margin: 25px 0 20px;
    text-align: center;
    font-weight: bold;
    margin-left: 5px;
  }
  .el-carousel__container {
    width: 100% !important;
    height: 250px;
  }
  .main-content {
    padding: 0px 0;
    min-height: 80vh;
  }
  .text-container {
    margin-left: 50%;
    font-size: larger;
    font-family: sans-serif;
  }
  .el-tabs_content {
    margin-right: 10px;
    margin-left: 10px;
  }
  .el-input__inner {
    width: 100% !important;
    margin-left: 0px !important;
  }
}
@media screen and (max-width: 350px) {
  .el-carousel__container {
    width: 100% !important;
    height: 250px;
  }
}
</style>
