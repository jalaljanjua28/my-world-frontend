<template>
  <div id="app">
    <the-header></the-header>
    <el-container>
      <the-nav></the-nav>
      <the-main></the-main>
    </el-container>
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheHeader from "../components/Layout/TheHeader.vue";
import TheNav from "../components/Layout/TheNav.vue";
import TheMain from "../components/Layout/TheMain.vue";
import TheFooter from "../components/Layout/TheFooter.vue";

export default {
  components: {
    TheHeader,
    TheNav,
    TheMain,
    TheFooter,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
