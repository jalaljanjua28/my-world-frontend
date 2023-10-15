import Vue from "vue";
import App from "./App.vue";
import "./plugins/element.js";
import router from "./router";
import store from "./store/index.js";
import BaseCard from "./components/UI/BaseCard";

Vue.component("base-card", BaseCard);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
