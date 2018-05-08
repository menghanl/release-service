<template>
  <div>
    <!-- <div class="py-5 text-center">
      <img class="d-block mx-auto mb-4" src="@/assets/logo.png" alt width="72" height="72">
      <h2>release note generator</h2>
    </div> -->
    <b-breadcrumb>
      <b-breadcrumb-item active="true" :text="org" />
      <b-breadcrumb-item active="true" :text="repo" />
      <b-breadcrumb-item active="true" :text="version" />
    </b-breadcrumb>

    <div v-show="loading">
      <spinner size="huge" message="Loading..."></spinner>
    </div>

    <div v-show="!loading">
      <div>
        <b-btn v-b-modal.modal1>Show markdown</b-btn>
        <b-modal id="modal1" title="Release 1.11.0" size="lg">
          <b-form-textarea style='font-size: 12px; font-family: monospace' id="markdowntest" :value="generateMarkdown(notes)" plaintext :rows='20' />
        </b-modal>
      </div>

      <div v-for="(section, i) in notes.sections" :key="section.name">
        <b-card class="m-3">
          <h4>{{ section.name }}</h4>
          <draggable v-model="notes.sections[i].entries" :options="{draggable:'.item'}">
            <issue class="item" v-for="issue in notes.sections[i].entries" :key="issue.id" :data="issue" />
          </draggable>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import issue from "@/components/issue.vue";
import draggable from "vuedraggable";
import Spinner from "vue-simple-spinner";

import axios from "axios";
import testdata from "@/assets/testdata-new.json";

import { notesToMarkdown } from "@/components/util";

export default {
  name: "release",
  components: {
    draggable,
    Spinner,
    issue
  },

  data() {
    return {
      org: "unknown",
      repo: "unknown",
      version: "unknown",
      loading: true,
      notes: []
    };
  },

  created() {
    this.fetchData();
  },

  watch: {
    $route: "fetchData"
  },

  methods: {
    generateMarkdown() {
      return notesToMarkdown(this.notes);
    },
    fetchData() {
      this.loading = true;
      this.org = this.$route.params.org;
      this.repo = this.$route.params.repo;
      this.version = this.$route.params.version;
      axios
        .get(`/api/release`, {
          params: {
            org: this.org,
            repo: this.repo,
            version: this.version
          }
        })
        .then(response => {
          this.notes = response.data;
          this.loading = false;
        })
        .catch(e => {
          console.log(e);
          this.notes = testdata;
          this.loading = false;
        });
    }
  }
};
</script>


