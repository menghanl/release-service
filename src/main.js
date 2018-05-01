import Vue from "vue";
import router from "./router";
import App from "./App.vue";

import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "vue-awesome/icons";
import Icon from "vue-awesome/components/Icon";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.component("icon", Icon);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  template: "<App/>",
  components: { App }
});
