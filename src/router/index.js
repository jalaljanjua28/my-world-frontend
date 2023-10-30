import Vue from "vue";
import VueRouter from "vue-router";
import store from "./../store/index.js";
import HomeView from "../views/HomeView.vue";
import ShoppingCart from "../views/ShoppingCart.vue";
import OffersList from "../views/OffersList";
import Food from "../components/Data-resources/ProductDetails/ShoppingList/FoodList.vue";
import NonFood from "../components/Data-resources/ProductDetails/ShoppingList/NonFoodList.vue";
import AboutUs from "../views/AboutUs";
import ItemsInventory from "../views/ItemsInventory";
import AccountPage from "../views/AccountPage";
import OrdersHistory from "../views/OrdersHistory";
import RecipePage from "../views/RecipePage";
import FAQPage from "../views/FAQs";
import BarcodeScan from "../views/BarcodeScan";
import Search from "../components/Data-resources/Search-component/SearchInventory.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/shopping-cart",
    name: "shopping",
    component: ShoppingCart,
  },
  {
    path: "/offer-list",
    name: "offer",
    component: OffersList,
  },
  {
    path: "/product-Food",
    name: "food",
    component: Food,
  },
  {
    path: "/product-NonFood",
    name: "nonfood",
    component: NonFood,
  },
  {
    path: "/about-us",
    name: "about",
    component: AboutUs,
  },
  {
    path: "/items-inventory",
    name: "inventory",
    component: ItemsInventory,
  },
  {
    path: "/account-page",
    name: "login",
    component: AccountPage,
  },
  {
    path: "/orders-history",
    name: "order",
    component: OrdersHistory,
  },
  {
    path: "/recipe-page",
    name: "recipe",
    component: RecipePage,
  },
  {
    path: "/faqs-page",
    name: "faqs",
    component: FAQPage,
  },
  {
    path: "/barcode-scan",
    name: "barcode",
    component: BarcodeScan,
  },
  {
    path: "/search-inventory",
    name: "search",
    component: Search,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  store.commit("setLoading", true);
  next();
});
router.afterEach(() => {
  setTimeout(() => {
    store.commit("setLoading", false);
  }, 1000);
});

export default router;
