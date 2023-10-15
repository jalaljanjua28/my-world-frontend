<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item>
        <router-link to="/">
          <el-button icon="el-icon-caret-left">Back</el-button>
        </router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="offer-page">
      <el-col :span="8" v-for="item in items" :key="item.id">
        <el-card class="offer-item">
          <img :src="item.image" class="offer-item-image" />
          <div class="offer-item-content">
            <h3 class="offer-item-title">{{ item.title }}</h3>
            <p class="offer-item-description">{{ item.description }}</p>
            <h4 class="offer-item-price">{{ item.price }}</h4>
            <h5 class="offer-item-offer">{{ item.offer }}</h5>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          id: 1,
          title: "Item 1",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          price: "$50",
          offer: "50% Sale",
        },
        {
          id: 2,
          title: "Item 2",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          price: "$100",
          offer: "Buy One Get One Free",
        },
        {
          id: 3,
          title: "Item 3",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          price: "$150",
          offer: "30% Off",
        },
      ],
    };
  },
};
</script>

<style scoped>
.el-col-8 {
  width: 30.33333%;
}
.offer-page {
  display: flex;
  flex-direction: row;
  margin-top: 50px;
  justify-content: center;
}

.offer-item {
  height: 470px;
  text-align: center;
}

.offer-item-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.offer-item-content {
  padding: 0px;
  line-height: 19px;
}

.offer-item-title {
  margin-bottom: 10px;
}

.offer-item-offer {
  color: red;
}
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
@media screen and (max-width: 600px) {
  .offer-page[data-v-7f471be2] {
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    align-items: center;
  }
  .el-col-8[data-v-7f471be2] {
    width: 60%;
  }
}
</style>
