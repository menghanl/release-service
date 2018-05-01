import Vue from "vue";
import Router from "vue-router";
import release from "@/components/release";

Vue.use(Router);

const NotFound = { template: "<div>Not Found</div>" };

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/release/:org/:repo/:version",
      name: "release",
      component: release
    },
    {
      path: "*",
      name: "NotFound",
      component: NotFound
    }
  ]
});
