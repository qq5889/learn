import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import DemoStyle from "../views/DemoStyle.vue";
import DemoBind from "../views/DemoBind.vue";
import DemoTemplete from "../views/DemoTemplete.vue";
import DemoComponentPage from "../views/DemoComponentPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/DemoStyle",
    name: "DemoStyle",
    component: DemoStyle
  },
  {
    path: "/DemoBind",
    name: "DemoBind",
    component: DemoBind
  },
  {
    path: "/DemoTemplete",
    name: "DemoTemplete",
    component: DemoTemplete
  },
  {
    path: "/DemoComponentPage",
    name: "DemoComponentPage",
    component: DemoComponentPage
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
