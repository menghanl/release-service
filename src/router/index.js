import Vue from "vue";
import Router from "vue-router";
import release from "@/components/release";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/release/:org/:repo/:version",
      name: "release",
      component: release
    }
  ]
});
