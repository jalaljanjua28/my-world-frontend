<template>
  <div>
    <el-input
      v-model="searchQuery"
      placeholder="Search for items"
      class="search-input"
      @change="searchItems"
    />
    <div v-if="displayResults">
      <ul>
        <el-row>
          <el-col>
            <li v-for="(item, index) in filteredItems" :key="index">
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
          </el-col>
        </el-row>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      displayResults: false,
      filteredItems: [],
    };
  },
  methods: {
    searchItems() {
      // Implement search logic here
      const searchValue = this.searchQuery.toLowerCase();
      const allItems = [
        ...this.ExpiredFood,
        ...this.ExpiredNonFood,
        ...this.NonExpiredFood,
        ...this.NonExpiredNonFood,
      ];

      this.filteredItems = allItems.filter((item) =>
        item.name.toLowerCase().includes(searchValue)
      );

      this.displayResults = true;
      this.searchQuery = "";
    },
  },
  props: {
    ExpiredFood: Array,
    ExpiredNonFood: Array,
    NonExpiredFood: Array,
    NonExpiredNonFood: Array,
  },
};
</script>

<style></style>
