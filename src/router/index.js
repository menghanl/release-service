import Vue from "vue";
import Router from "vue-router";
import release from "@/components/release";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Hello",
      component: release
    },
    {
      path: "/release",
      name: "release",
      component: release
    }
  ]
});
