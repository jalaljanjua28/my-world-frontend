<template>
  <el-main class="main-content">
    <SearchComponent :Food="Food" :NonFood="NonFood" />
    <div>
      <el-header>
        <h1 class="header-title">Items progress Bar</h1>
      </el-header>
      <p style="margin-left: 23px; margin-bottom: -18px">Expired Items</p>
      <el-progress
        :text-inside="true"
        :stroke-width="26"
        :percentage="parseFloat(getExpiredPercentage())"
      >
        {{ getExpiredPercentage() + "% Expired" }}
      </el-progress>
      <br />
      <p style="margin-left: 23px; margin-bottom: -18px">Non-Expired Items</p>
      <el-progress
        :text-inside="true"
        :stroke-width="24"
        :percentage="parseFloat(getNonExpiredPercentage())"
        status="success"
      >
      </el-progress>
      <div style="margin-top: 30px; margin-bottom: 50px">
        <br />
        <el-progress type="circle" :percentage="0"></el-progress>
        <el-progress type="circle" :percentage="25"></el-progress>
        <el-progress
          type="circle"
          :percentage="100"
          status="success"
        ></el-progress>
        <el-progress
          type="circle"
          :percentage="70"
          status="warning"
        ></el-progress>
        <el-progress
          type="circle"
          :percentage="50"
          status="exception"
        ></el-progress>
      </div>
    </div>

    <el-button @click="downloadLatestReceipt()" type="success">
      Click to view Items
    </el-button>

    <div v-if="displayResult">
      <base-card>
        <el-header>
          <h1 class="header-title">Purchased Items</h1>
        </el-header>
        <section>
          <el-tabs>
            <el-tab-pane label="Food"
              ><span slot="label" style="font-size: large"
                ><i
                  class="el-icon-food"
                  style="font-size: 22px; color: #6457f0"
                ></i>
                Food</span
              >
              <div>
                <items-component :items="Food"></items-component>
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
                <items-component :items="NonFood"></items-component>
              </div>
            </el-tab-pane>
          </el-tabs>
        </section>
      </base-card>
    </div>
    <BarcodeScanDummy class="barcode" ref="BarcodeScanDummy" />
  </el-main>
</template>

<script>
import ItemsComponent from "../Data-resources/MainItemsComponent.vue";
import SearchComponent from "../Data-resources/Search-component/SearchMainComponent.vue";
import BarcodeScanDummy from "@/views/BarcodeScanDummy.vue";

export default {
  components: {
    ItemsComponent,
    SearchComponent,
    BarcodeScanDummy,
  },
  data() {
    return {
      Food: [],
      NonFood: [],
      // fileData: [],
      Food_nonexpired: [],
      displayResult: false, // Separate array for non-expired Food items
    };
  },
  mounted() {
    this.shopping_list(); // Fetch and process the master list data
    // const storedFileData = localStorage.getItem("fileData");
    // console.log("Stored data:", storedFileData);

    // if (storedFileData) {
    //   console.log("Parsing data...");

    //   // If data exists in localStorage, parse it and set it to this.fileData
    //   this.fileData = JSON.parse(storedFileData);
    //   this.useFileData(); // Call the function to process the data
    // }
    this.$refs.BarcodeScanDummy.simulateUpload();
    console.log("simulateUpload function triggered in BarcodeScanDummy.vue");
  },
  methods: {
    shopping_list() {
      fetch(
        "https://my-world-app-7nnip2tiwq-as.a.run.app/get-shopping-list-expired",
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
          try {
            const base64Data = data.data;
            const binaryData = new Uint8Array(
              [...atob(base64Data)].map((char) => char.charCodeAt(0))
            );

            const textDecoder = new TextDecoder();
            const decodedData = textDecoder.decode(binaryData);

            const parsedData = JSON.parse(decodedData);

            const Food = parsedData.Food;

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
              // Log the item and the condition result
              // console.log("Item:", item);
              // console.log("Is item expired?", (item.Status = "Expired"));
              // Separate non-expired Food items
              if (item.Status === "Expired") {
                this.Food_nonexpired.push(item);
                // console.log("Expired item:", item);
              }
            }
            this.Food = Food;
          } catch (error) {
            console.error("Error:", error);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },

    // Calculate the percentage of expired items
    getExpiredPercentage() {
      if (this.Food.length === 0) {
        return 0;
      }
      const expiredItems = this.Food.filter((item) => {
        // Add your expiration date check logic here
        return item.status === "Expired"; // Modify this condition as needed
      });
      return ((expiredItems.length / this.Food.length) * 100).toFixed(2);
    },

    // Calculate the percentage of non-expired items
    getNonExpiredPercentage() {
      if (this.Food.length === 0) {
        return 0;
      }
      const nonExpiredItems = this.Food.filter((item) => {
        // Add your expiration date check logic here
        return item.status === "Not Expired"; // Modify this condition as needed
      });
      return ((nonExpiredItems.length / this.Food.length) * 100).toFixed(2);
    },

    // saveFileData(arrayBuffer) {
    //   this.fileData = arrayBuffer;
    //   localStorage.setItem("fileData", JSON.stringify(arrayBuffer));
    //   console.log(this.fileData);
    // },

    // useFileData() {
    //   if (this.fileData === null) {
    //     console.error("fileData is empty.");
    //     this.displayResult = false;
    //     return;
    //   } else {
    //     const binaryData = new Uint8Array(this.fileData);
    //     const textDecoder = new TextDecoder();
    //     const decodedData = textDecoder.decode(binaryData);
    //     console.log("Received data:", decodedData);

    //     if (decodedData) {
    //       try {
    //         const parsedData = JSON.parse(decodedData);
    //         if (parsedData && parsedData.Food && parsedData.Not_Food) {
    //           const Food = parsedData.Food;
    //           const NonFood = parsedData.Not_Food;

    //           for (const id in Food) {
    //             const item = {
    //               id: parseInt(id),
    //               name: Food[id].Name,
    //               image: Food[id].Image,
    //               date: Food[id].Date,
    //               expiry: Food[id].Expiry_Date,
    //               price: Food[id].Price,
    //               status: Food[id].Status,
    //             };
    //             Food[id] = item;
    //           }

    //           for (const id in NonFood) {
    //             const item = {
    //               id: parseInt(id),
    //               name: NonFood[id].Name,
    //               image: NonFood[id].Image,
    //               date: NonFood[id].Date,
    //               price: NonFood[id].Price,
    //               status: NonFood[id].Status,
    //             };
    //             NonFood[id] = item;
    //           }
    //           this.Food = Food;
    //           this.NonFood = NonFood;
    //           this.displayResult = true;
    //         } else {
    //           throw new Error("Data structure is not as expected");
    //         }
    //       } catch (error) {
    //         console.error("Error parsing JSON data:", error);
    //       }
    //     } else {
    //       throw new Error("Received empty data or invalid JSON");
    //     }
    //     this.displayResult = true;
    //   }
    //   // else {
    //   //   this.downloadLatestReceipt();
    //   // }
    // },
    downloadLatestReceipt() {
      fetch(
        "https://my-world-app-7nnip2tiwq-as.a.run.app/serve-latest-receipt-data",
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.blob();
        })
        .then((blob) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsArrayBuffer(blob);
          });
        })
        .then((arrayBuffer) => {
          const binaryData = new Uint8Array(arrayBuffer);
          const textDecoder = new TextDecoder();
          const decodedData = textDecoder.decode(binaryData);

          if (decodedData) {
            try {
              const parsedData = JSON.parse(decodedData);
              if (parsedData && parsedData.Food && parsedData.Not_Food) {
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
              } else {
                throw new Error("Data structure is not as expected");
              }
            } catch (error) {
              console.error("Error parsing JSON data:", error);
            }
          } else {
            throw new Error("Received empty data or invalid JSON");
          }
          // this.saveFileData(arrayBuffer);
          this.displayResult = true;
        })
        .catch((error) => {
          console.error("Error downloading latest receipt:", error);
          // Handle the error in your preferred way, e.g., show an error message
        });
    },
  },
};
</script>

<style>
.barcode {
  display: none;
}
.header-title {
  text-align: left;
  margin-top: 25px;
}
.el-breadcrumb__item {
  float: unset;
}

/* Common styles for buttons */
.el-button {
  padding: 11px 10px;
  line-height: 1.5;
  font-weight: 500;
}

.el-button--small {
  font-size: 25px;
  border: none;
  color: #6457f0 !important;
}

/* Input styles */
.el-input__suffix {
  height: 100%;
  right: 10px;
  transition: all 0.3s;
  pointer-events: none;
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

/* Improved carousel styles */
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

/* Main content styles */
.main-content {
  background-color: #f0f2f5;
  min-height: 90vh;
  flex: 1;
}

/* Section titles */
.section-title {
  margin: 25px 0;
  text-align: center;
  font-weight: bold;
  color: #333;
}

/* Item card styles */
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
.el-progress {
  position: relative;
  line-height: 1;
  margin-top: 30px;
  margin-right: 50px;
  margin-left: 20px;
  margin-bottom: 30px;
}
.el-progress-bar__innerText {
  display: inline-block;
  vertical-align: middle;
  color: #fff;
  font-size: 20px;
  font: bold;
  margin: 0 5px;
  font-weight: 600;
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
