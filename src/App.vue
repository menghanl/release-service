<template>
  <div id="app" class="container">
    <router-link to="/release">release</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>