<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item>
        <router-link to="/">
          <el-button icon="el-icon-caret-left">Back</el-button>
        </router-link>
      </el-breadcrumb-item>
      <el-breadcrumb-item>Shopping List</el-breadcrumb-item>
    </el-breadcrumb>
    <base-card>
      <search-inventory
        :ExpiredFood="Food_expired"
        :ExpiredNonFood="NonFood_expired"
        :NonExpiredFood="Food_nonexpired"
        :NonExpiredNonFood="NonFood_nonexpired"
      />
      <el-tabs :tab-position="tabPosition" style="height: auto">
        <el-tab-pane label="Non Expired" style=""
          ><span slot="label" style="font-size: x-large"
            ><i
              class="el-icon-success"
              style="font-size: 22px; color: #6457f0"
            ></i>
            Non Expired</span
          >
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
                  <food-nonexpired
                    :items="Food_nonexpired"
                    @item-deleted="handleItemDeleted"
                  ></food-nonexpired>
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
                  <nonfood-nonexpired
                    :items="NonFood_nonexpired"
                    @item-deleted="handleItemDeleted"
                  ></nonfood-nonexpired>
                </div>
              </el-tab-pane>
            </el-tabs>
          </section>
          <delete-all-master></delete-all-master>
        </el-tab-pane>
        <el-tab-pane label="Expired" style=""
          ><span slot="label" style="font-size: x-large"
            ><i
              class="el-icon-error"
              style="font-size: 22px; color: #6457f0"
            ></i>
            Expired</span
          >
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
                  <food-expired
                    :items="Food_expired"
                    @item-deleted="handleItemDeleted"
                  ></food-expired>
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
                  <nonfood-expired
                    :items="NonFood_expired"
                    @item-deleted="handleItemDeleted"
                  ></nonfood-expired>
                </div>
              </el-tab-pane>
            </el-tabs>
          </section>
          <delete-all-shopping-expired></delete-all-shopping-expired>
        </el-tab-pane>
        <el-tab-pane label="Shopping" style=""
          ><span slot="label" style="font-size: x-large"
            ><i
              class="el-icon-goods"
              style="font-size: 22px; color: #6457f0"
            ></i>
            Shopping List</span
          >
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
                  <items-list
                    :items="Food"
                    @item-deleted="handleItemDeleted"
                  ></items-list>
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
                  <items-list
                    :items="NonFood"
                    @item-deleted="handleItemDeleted"
                  ></items-list>
                </div>
              </el-tab-pane>
            </el-tabs>
          </section>
          <delete-all-shopping></delete-all-shopping>
        </el-tab-pane>
      </el-tabs>
      <div>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="x-small"
          @click="openDialog"
          style="padding: 10px 17px"
          >Add Item</el-button
        >
        <el-dialog :visible.sync="dialogVisible" title="Add Item">
          <add-items @item-added="closeDialog" />
        </el-dialog>
      </div>
    </base-card>
  </div>
</template>

<script>
import SearchInventory from "../components/Data-resources/Search-component/SearchInventory.vue";
import FoodExpired from "../components/Data-resources/ProductDetails/ShoppingList/FoodList.vue";
import NonfoodExpired from "../components/Data-resources/ProductDetails/ShoppingList/NonFoodList.vue";
import FoodNonexpired from "../components/Data-resources/ProductDetails/MasterList/FoodList.vue";
import NonfoodNonexpired from "../components/Data-resources/ProductDetails/MasterList/NonFoodList.vue";
import AddItems from "../components/Data-resources/AddCustomItem.vue";
import DeleteAllMaster from "../components/Data-resources/DeleteAllMaster.vue";
import DeleteAllShopping from "../components/Data-resources/DeleteAllShopping.vue";
import DeleteAllShoppingExpired from "../components/Data-resources/DeleteAllShoppingExpired.vue";
import ItemsList from "../components/Data-resources/ItemsList.vue";

export default {
  components: {
    ItemsList,
    SearchInventory,
    FoodExpired,
    NonfoodExpired,
    FoodNonexpired,
    NonfoodNonexpired,
    AddItems,
    DeleteAllMaster,
    DeleteAllShopping,
    DeleteAllShoppingExpired,
  },
  data() {
    return {
      Food: [],
      NonFood: [],
      Food_expired: [],
      NonFood_expired: [],
      Food_nonexpired: [],
      NonFood_nonexpired: [],
      items: [],
      tabPosition: "top",
      dialogVisible: false,
      dialogData: {}, // Data to pass to the Add Item component
    };
  },
  mounted() {
    this.master_list();
    this.shopping_list();
    this.shopping_list_expired();
  },
  methods: {
    openDialog() {
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    shopping_list_expired() {
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

            this.Food_expired = Food;
            this.NonFood_expired = NonFood;
          } catch (error) {
            console.error("Error:", error);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    shopping_list() {
      fetch("https://my-world-app-7nnip2tiwq-as.a.run.app/get-shopping-list", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      })
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
          } catch (error) {
            console.error("Error:", error);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    master_list() {
      fetch("https://my-world-app-7nnip2tiwq-as.a.run.app/get-master-list", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      })
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
            this.Food_nonexpired = Food;
            this.NonFood_nonexpired = NonFood;
          } catch (error) {
            console.error("Error:", error);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    handleItemDeleted(itemToDelete) {
      // Update the items prop by filtering out the deleted item
      this.items = this.items.filter((item) => item !== itemToDelete);
    },
  },
};
</script>

<style scoped>
.el-tabs__item {
  background: red;
}
.el-button {
  border: 0px solid #dcdfe6;
}

@media screen and (max-width: 728px) {
  /* Reverse the tab order */
  .tab-container {
    overflow-x: auto;
  }
  .tab-pane {
    min-width: 200px; /* Adjust this width as needed */
  }
}

@media screen and (min-width: 728px) {
  /* Reverse the tab order */
  .border-tab {
    width: 100%;
  }
}
.el-form-item__label {
  line-height: 60px;
}
</style>
