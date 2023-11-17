<template>
  <el-main class="main-content">
    <div>
      <!-- Search Item Button and Dialog -->
      <el-button
        type="primary"
        icon="el-icon-search"
        size="x-small"
        class="responsive-button"
        style="margin-left: 15px"
        @click="openSearchDialog"
      >
        Search Item
      </el-button>
      <el-dialog :visible.sync="dialogSearchVisible" title="Search Item">
        <search-main :Food="Food" :NonFood="NonFood" />
      </el-dialog>

      <!-- View Items Button and Dialog -->
      <el-button
        @click="openItemsDialog"
        type="success"
        class="responsive-button"
        style="margin-left: 15px"
      >
        Click to view Items
      </el-button>
      <el-dialog :visible.sync="dialogItemsVisible" title="Items List">
        <section>
          <el-tabs>
            <el-tab-pane label="Food">
              <span slot="label" style="font-size: large"
                ><i
                  class="el-icon-food"
                  style="font-size: 22px; color: #6457f0"
                ></i>
                Food</span
              >
              <div>
                <items :items="Food"></items>
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
                <items :items="NonFood"></items>
              </div>
            </el-tab-pane>
          </el-tabs>
        </section>
      </el-dialog>

      <!-- Open Recipes Button and Dialog -->
      <el-button
        @click="openRecipeDialog"
        class="fetch-button, responsive-button"
        type="warning"
        style="margin-left: 15px"
      >
        Open Recipes Dialog
      </el-button>
      <el-dialog :visible.sync="dialogRecipeVisible" title="Generated Recipes">
        <div v-if="recipes.length > 0" id="recipesContainer">
          <h2>Generated Recipes</h2>
          <div v-for="(recipe, index) in recipes" :key="index">
            <h3>Group of Items: {{ recipe["Group of Items"].join(", ") }}</h3>
            <p>Generated Recipe: {{ recipe["Generated Recipe"] }}</p>
          </div>
        </div>
      </el-dialog>

      <!-- Generate Diet Schedule Button and Dialog -->
      <el-button
        type="danger"
        @click="openDietDialog"
        style="margin-left: 15px"
        class="responsive-button"
      >
        Generate Diet Schedule
      </el-button>
      <el-dialog :visible.sync="dialogDietVisible" title="Diet Schedule">
        <div v-if="loading">Loading...</div>
        <div v-else>
          <div v-for="meal in dietSchedule" :key="meal['Meal Number']">
            <h4>
              Meal {{ meal["Meal Number"] }} - {{ meal["Meal Category"] }}
            </h4>
            <p><strong>Food Item:</strong> {{ meal["Food Item"] }}</p>
            <p>
              <strong>Meal Suggestion:</strong> {{ meal["Meal Suggestion"] }}
            </p>
            <hr />
          </div>
        </div>
      </el-dialog>
    </div>
    <prompts-gpt></prompts-gpt>
    <br />
    <barcode-dummy class="barcode" ref="BarcodeDummy" />
  </el-main>
</template>

<script>
import Items from "../Data-resources/ItemsList.vue";
import SearchMain from "../Data-resources/Search-component/SearchMain.vue";
import BarcodeDummy from "@/views/BarcodeDummy.vue";
import PromptsGpt from "../Data-resources/PromptsGPT.vue";

export default {
  components: {
    Items,
    SearchMain,
    BarcodeDummy,
    PromptsGpt,
  },
  data() {
    return {
      recipes: [],
      dialogSearchVisible: false,
      Food: [],
      NonFood: [],
      dialogDietVisible: false,
      dietSchedule: [],
      // fileData: [],
      Food_nonexpired: [],
      dialogRecipeVisible: false,
      dialogItemsVisible: false,
    };
  },
  mounted() {
    this.downloadLatestReceipt();
    // const storedFileData = localStorage.getItem("fileData");
    // console.log("Stored data:", storedFileData);

    // if (storedFileData) {
    //   console.log("Parsing data...");

    //   // If data exists in localStorage, parse it and set it to this.fileData
    //   this.fileData = JSON.parse(storedFileData);
    //   this.useFileData(); // Call the function to process the data
    // }
    this.$refs.BarcodeDummy.simulateUpload();
    console.log("simulateUpload function triggered in BarcodeDummy.vue");
  },
  methods: {
    async openDietDialog() {
      this.loading = true;
      try {
        const response = await fetch(
          "https://my-world-app-7nnip2tiwq-as.a.run.app/diet-schedule-gpt",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        this.dietSchedule = data.diet_schedule;
      } catch (error) {
        console.error("Error fetching diet schedule:", error);
      } finally {
        this.loading = false;
        this.dialogDietVisible = true;
      }
    },

    fetchRecipes() {
      fetch("https://my-world-app-7nnip2tiwq-as.a.run.app/recipes-using-gpt")
        .then((response) => response.json())
        .then((data) => {
          this.recipes = data.recipes;
        })
        .catch((error) => console.error("Error fetching recipes:", error));
    },
    openRecipeDialog() {
      this.fetchRecipes(); // Fetch recipes when the dialog is opened
      this.dialogRecipeVisible = true;
    },
    closeRecipeDialog() {
      this.dialogRecipeVisible = false;
    },
    openSearchDialog() {
      this.dialogSearchVisible = true;
    },
    closeSearchDialog() {
      this.dialogSearchVisible = false;
    },
    openItemsDialog() {
      this.dialogItemsVisible = true;
    },
    closeItemsDialog() {
      this.dialogItemsVisible = false;
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
                    days_left: Food[id].Days_Until_Expiry,
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
                    days_left: NonFood[id].Days_Until_Expiry,
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
.responsive-button {
  margin-top: 10px;
  margin-bottom: 10px;
}
.el-dialog {
  width: 70%;
}
.el-tabs {
  margin-top: -10px;
}
.barcode {
  display: none;
}
/* .header-title {
  text-align: left;
  margin-top: 0px;
} */
.el-breadcrumb__item {
  float: unset;
}

/* Common styles for buttons */
/* .el-button {
  padding: 11px 10px;
  line-height: 1.5;
  font-weight: 500;
}

.el-button--small {
  font-size: 25px;
  border: none;
  color: #6457f0 !important;
} */

/* Input styles */
/* .el-input__suffix {
  height: 100%;
  right: 10px;
  transition: all 0.3s;
  pointer-events: none;
} */

/* .el-input__icon {
  color: black;
} */

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
/* .el-carousel__container {
  width: 450px;
  height: 250px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
} */

/* .el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
} */

/* Main content styles */
.main-content {
  background-color: #f0f2f5;
  min-height: 90vh;
  flex: 1;
}

/* Section titles */
/* .section-title {
  margin: 25px 0;
  text-align: center;
  font-weight: bold;
  color: #333;
} */

/* Item card styles */
/* .item-card {
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
} */

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
