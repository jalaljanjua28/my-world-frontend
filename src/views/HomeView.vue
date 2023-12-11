<template>
  <div id="app">
    <the-header></the-header>
    <the-main></the-main>
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheHeader from "../components/Layout/TheHeader.vue";
import TheMain from "../components/Layout/TheMain.vue";
import TheFooter from "../components/Layout/TheFooter.vue";

export default {
  components: {
    TheHeader,
    TheMain,
    TheFooter,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
