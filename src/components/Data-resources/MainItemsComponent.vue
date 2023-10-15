<template>
  <div>
    <ul>
      <el-row>
        <el-col>
          <li v-for="(item, index) in items" :key="index">
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
        </el-col>
      </el-row>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>

<style>
li {
  display: inline-block;
  margin-right: 30px;
  margin-top: 20px;
}
</style>
