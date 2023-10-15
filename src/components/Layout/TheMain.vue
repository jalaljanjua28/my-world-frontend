<template>
  <el-main class="main-content">
    <SearchComponent :Food="Food" :NonFood="NonFood" />
    <section>
      <el-tabs type="border-card">
        <el-tab-pane label="Food"
          ><span slot="label" style="font-size: large"
            ><i
              class="el-icon-food"
              style="font-size: 22px; color: #6457f0"
            ></i>
            Food</span
          >
          <div>
            <load-component :items="Food"></load-component>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Not Food">
          <span slot="label" style="font-size: large"
            ><i
              class="el-icon-bicycle"
              style="font-size: 22px; color: #6457f0"
            ></i>
            Non Food</span
          >
          <div>
            <load-component :items="NonFood"></load-component>
          </div>
        </el-tab-pane>
      </el-tabs>
    </section>
  </el-main>
</template>

<script>
import LoadComponent from "../Data-resources/LoadComponent.vue";
import SearchComponent from "../Data-resources/Search-component/SearchComponent.vue";

export default {
  components: {
    LoadComponent,
    SearchComponent,
  },
  data() {
    return {
      Food: [],
      NonFood: [],
    };
  },
  mounted() {
    this.loadItemsData();
  },
  methods: {
    loadItemsData() {
      fetch(
        " https://my-world-app-7nnip2tiwq-as.a.run.app/get-latest-receipt-data",
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to fetch data.");
          }
        })
        .then((data) => {
          const base64Data = data.data;
          const binaryData = new Uint8Array(
            [...atob(base64Data)].map((char) => char.charCodeAt(0))
          );

          const textDecoder = new TextDecoder();
          const decodedData = textDecoder.decode(binaryData);

          const parsedData = JSON.parse(decodedData);

          const Food = parsedData.Food;
          const NonFood = parsedData.Not_Food;

          for (const id in Food) {
            const item = {
              id: parseInt(id),
              name: Food[id].Name,
              image: Food[id].Image,
              date: Food[id].Date,
              expiry: Food[id].Expiry_Date,
              price: Food[id].Price,
              status: Food[id].Status,
            };
            Food[id] = item;
          }

          for (const id in NonFood) {
            const item = {
              id: parseInt(id),
              name: NonFood[id].Name,
              image: NonFood[id].Image,
              date: NonFood[id].Date,
              price: NonFood[id].Price,
              status: NonFood[id].Status,
            };
            NonFood[id] = item;
          }
          this.Food = Food;
          this.NonFood = NonFood;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
};
</script>

<style>
.el-button {
  padding: 11px 10px;
  line-height: 1.5;
}
.el-button--small {
  font-size: 25px;
  border: none;
  color: #6457f0 !important;
}
.el-input__suffix {
  height: 100%;
  right: 10px;
  transition: all 0.3s;
  pointer-events: none;
}
.el-tabs--border-card > .el-tabs__content {
  padding: 0px;
}
.el-input__icon {
  color: black;
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
div[data-v-48bb6248] {
  margin: 1rem auto !important;
  max-width: 100% !important;
  padding: 1rem !important;
  border-radius: 12px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26) !important;
}
.el-carousel__container {
  width: 450px;
  height: 250px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.main-content {
  background-color: #f0f2f5;
  min-height: 90vh;
  flex: 1;
}
.section-title3 {
  margin: 25px 0 20px;
  text-align: center;
  font-weight: bold;
  color: #333;
}
.section-title1 {
  margin: 25px 0 50px;
  text-align: center;
  font-weight: bold;
  margin-left: 5px;
}
.section-title2 {
  margin: 25px 0 5px;
  text-align: center;
  font-weight: bold;
}
.item-card {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 20px;
  overflow: hidden;
  margin-top: 10px;
}
.item-card img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}
.item-card .item-name {
  font-weight: bold;
  margin-top: 20px;
}
.item-card .item-description {
  margin-top: 10px;
  text-align: left;
  height: 125px;
  overflow: hidden;
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
