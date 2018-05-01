<template>

  <b-card no-body class="m-1">
    <b-card-header header-tag="header" class="p-1 d-flex justify-content-between align-items-center" role="tab">
      <div>
        {{ data.title }}
        <b-button size='sm' class='py-0' variant='light' :pressed.sync="data.specialthanks">
          <img class="rounded mx-auto p-1" :src="data.user.avatar_url" alt="avatar" width="25" height="25">
          <a class="text-muted" :href="data.user.html_url">{{ data.user.login }}</a>
          <!-- <b-link class="text-muted" disabled :href="data.user.html_url">{{ data.user.login }}</b-link> -->
        </b-button>
      </div>
      <b-btn href="#" v-b-toggle="collapseid" variant="light">
        <icon name="ellipsis-v"></icon>
      </b-btn>
    </b-card-header>
    <b-collapse :id="collapseid" role="tabpanel">
      <b-card-body>
        <p class="card-text">
          <a :href="data.html_url">{{ data.html_url }}</a>
        </p>

        <div>
          <b-badge pill :key="data.milestone.id" variant="success">{{ data.milestone.title }}</b-badge>
          <b-badge pill v-for="label in data.labels" :key="label.id" variant="">{{ label.name }}</b-badge>
        </div>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>

<script>
export default {
  name: "issue",
  components: {},
  computed: {
    title() {
      return "#" + this.data.number + ": " + this.data.title;
    },
    collapseid() {
      return "collapse" + this.data.id;
    }
  },
  props: {
    msg: String,
    data: {}
  }
};
</script>