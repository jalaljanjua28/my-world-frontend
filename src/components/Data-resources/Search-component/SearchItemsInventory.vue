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
            <li v-for="(item, index) in ExpiredFoodSearch" :key="index">
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
            <li v-for="(item, index) in ExpiredNonfoodSearch" :key="index">
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
            <li v-for="(item, index) in NonExpiredFoodSearch" :key="index">
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
            <li v-for="(item, index) in NonExpiredNonFoodSearch" :key="index">
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
              style=""
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
      ExpiredFoodSearch: [],
      ExpiredNonfoodSearch: [],
      NonExpiredFoodSearch: [],
      NonExpiredNonFoodSearch: [],
    };
  },
  methods: {
    searchItems() {
      // Implement search logic here
      const searchValue = this.searchQuery.toLowerCase();

      this.ExpiredFoodSearch = this.ExpiredFood.filter((item) =>
        item.name.toLowerCase().includes(searchValue)
      );

      this.ExpiredNonfoodSearch = this.ExpiredNonFood.filter((item) =>
        item.name.toLowerCase().includes(searchValue)
      );
      this.NonExpiredFoodSearch = this.NonExpiredFood.filter((item) =>
        item.name.toLowerCase().includes(searchValue)
      );

      this.NonExpiredNonFoodSearch = this.NonExpiredNonFood.filter((item) =>
        item.name.toLowerCase().includes(searchValue)
      );

      this.searchQuery = "";
    },
  },
  props: {
    ExpiredFood: Array, // Pass the Food array as a prop
    ExpiredNonFood: Array, // Pass the NotFood array as a prop
    NonExpiredFood: Array,
    NonExpiredNonFood: Array,
  },
};
</script>
<style>
.search-container {
  display: flex;
  align-items: center;
}

.search-input {
  flex-grow: 1;
  margin-right: -72px; /* Adjust the margin as needed */
}

.search-button {
  flex-shrink: 0;
  font-size: x-large !important;
  margin-bottom: 11px;
  font-size: 16px;
  border: none !important;
  background: #f9f9f9 !important;
  color: #6457f0 !important;
}
.el-button.is-circle {
  border-radius: 50%;
  padding: 0px;
}
</style>
