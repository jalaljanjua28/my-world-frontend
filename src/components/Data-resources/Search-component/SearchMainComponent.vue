<template>
  <div class="search-container">
    <el-input
      v-model="searchQuery"
      placeholder="Search for items"
      class="search-input"
    />
    <ul>
      <el-row>
        <el-col>
          <el-popover placement="right" width="200px" trigger="click">
            <li v-for="(item, index) in foodSearchResults" :key="index">
              <img :src="item.image" :alt="item.image" />
              <div>
                <span>{{ item.name }}</span>
                <div>
                  <span>{{ item.price }}</span>
                </div>
                <div>
                  <span>{{ item.status }}</span>
                </div>
                <div class="bottom clearfix">
                  <time class="time">Purchase/Expiry: {{ item.date }} </time>
                </div>
                <div class="bottom clearfix">
                  <time class="time">{{ item.expiry }} </time>
                </div>
                <div>
                  <button class="button">Add to Cart</button>
                </div>
              </div>
            </li>
            <li v-for="(item, index) in nonFoodSearchResults" :key="index">
              <img :src="item.image" :alt="item.image" />
              <div>
                <span>{{ item.name }}</span>
                <div>
                  <span>{{ item.price }}</span>
                </div>
                <div>
                  <span>{{ item.status }}</span>
                </div>
                <div class="bottom clearfix">
                  <time class="time">Purchase/Expiry: {{ item.date }} </time>
                </div>
                <div class="bottom clearfix">
                  <time class="time"> {{ item.expiry }} </time>
                </div>
                <div>
                  <button class="button">Add to Cart</button>
                </div>
              </div>
            </li>
            <el-button
              @click="searchItems"
              slot="reference"
              icon="el-icon-search"
              circle
              class="search-button"
            ></el-button>
          </el-popover>
        </el-col>
      </el-row>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      foodSearchResults: [],
      nonFoodSearchResults: [],
    };
  },
  methods: {
    searchItems() {
      // Implement search logic here
      const searchValue = this.searchQuery.toLowerCase();

      this.foodSearchResults = this.Food.filter((item) =>
        item.name.toLowerCase().includes(searchValue)
      );

      this.nonFoodSearchResults = this.NonFood.filter((item) =>
        item.name.toLowerCase().includes(searchValue)
      );

      this.searchQuery = "";
    },
  },
  props: {
    Food: Array, // Pass the Food array as a prop
    NonFood: Array, // Pass the NotFood array as a prop
  },
};
</script>
<style>
.search-container {
  display: flex;
  align-items: center;
  width: 100%;
}
.search-button {
  flex-shrink: 0;
  font-size: x-large !important;
  margin-bottom: 9px !important;
  font-size: 16px;
  border: none !important;
  color: #6457f0 !important;
}

.el-button.is-circle {
  padding: 0px;
  background: none;
  border-radius: 50%;
}

.search-input {
  flex-grow: 1;
  margin-right: -72px; /* Adjust the margin as needed */
}
@media screen and (max-width: 520px) {
  .search-container {
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 0px;
  }
}
</style>
