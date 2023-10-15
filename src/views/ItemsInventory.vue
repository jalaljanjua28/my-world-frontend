<template>
  <div>
    <el-main class="main-content">
      <el-breadcrumb>
        <el-breadcrumb-item>
          <router-link to="/">
            <el-button icon="el-icon-caret-left">Back</el-button>
          </router-link>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <SearchItemsInventory
        :ExpiredFood="Food_expired"
        :ExpiredNonFood="NonFood_expired"
        :NonExpiredFood="Food_nonexpired"
        :NonExpiredNonFood="NonFood_nonexpired"
      />
      <section>
        <div class="tab-container">
          <el-tabs type="border-card" style="display: inline-block !important">
            <el-tab-pane label="Food" class="tab-pane"
              ><span slot="label" style="font-size: large"
                ><i
                  class="el-icon-food"
                  style="font-size: 22px; color: #6457f0"
                ></i>
                N-Exp / Food</span
              >
              <div>
                <load-component :items="Food_nonexpired"></load-component>
              </div>
            </el-tab-pane>
            <el-tab-pane label="Not Food" class="tab-pane">
              <span slot="label" style="font-size: large"
                ><i
                  class="el-icon-bicycle"
                  style="font-size: 22px; color: #6457f0"
                ></i>
                N-Exp / Non Food</span
              >
              <div>
                <load-component :items="NonFood_nonexpired"></load-component>
              </div>
            </el-tab-pane>

            <el-tab-pane label="Food" class="tab-pane"
              ><span slot="label" style="font-size: large"
                ><i
                  class="el-icon-food"
                  style="font-size: 22px; color: #6457f0"
                ></i>
                Exp / Food</span
              >
              <div>
                <load-component :items="Food_expired"></load-component>
              </div>
            </el-tab-pane>
            <el-tab-pane label="Not Food" class="tab-pane">
              <span slot="label" style="font-size: large"
                ><i
                  class="el-icon-bicycle"
                  style="font-size: 22px; color: #6457f0"
                ></i>
                Exp / Non Food</span
              >
              <div>
                <load-component :items="NonFood_expired"></load-component>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </section>
    </el-main>
  </div>
</template>

<script>
import LoadComponent from "../components//Data-resources/LoadComponent.vue";
import SearchItemsInventory from "../components/Data-resources/Search-component/SearchItemsInventory.vue";

export default {
  components: {
    LoadComponent,
    SearchItemsInventory,
  },
  data() {
    return {
      Food_expired: [],
      NonFood_expired: [],
      Food_nonexpired: [],
      NonFood_nonexpired: [],
    };
  },
  mounted() {
    this.shopping_list();
    this.master_list();
  },
  methods: {
    shopping_list() {
      fetch(
        " https://my-world-app-7nnip2tiwq-as.a.run.app/get-shopping-list-expired",
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
    master_list() {
      fetch(" https://my-world-app-7nnip2tiwq-as.a.run.app/get-master-list", {
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
  },
};
</script>

<style scoped>
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
@media screen and (max-width: 520px) {
  /* Reverse the tab order */
  .tab-container {
    overflow-x: auto;
  }
  .tab-pane {
    min-width: 200px; /* Adjust this width as needed */
  }
}
</style>
