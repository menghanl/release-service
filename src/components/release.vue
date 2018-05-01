<template>
  <div>
    <div class="py-5 text-center">
      <img class="d-block mx-auto mb-4" src="@/assets/logo.png" alt width="72" height="72">
      <h2>release note generator</h2>
      <h4>for {{ org }}/{{ repo }}/{{ version }}</h4>
    </div>

    <div>
      <b-btn v-b-modal.modal1>Show markdown</b-btn>
      <b-modal id="modal1" title="Release 1.11.0" size="lg">
        <b-form-textarea style='font-size: 12px; font-family: monospace' id="markdowntest" :value="issuesToMarkdown(issuesSectioned)" plaintext :rows='20' />
      </b-modal>
    </div>

    <div v-for="(issues, label) in issuesSectioned" :key="label">
      <b-card class="m-3">
        <h4>{{ label }}</h4>
        <draggable v-model="issuesSectioned[label]" :options="{draggable:'.item'}">
          <issue class="item" v-for="issue in issues" :key="issue.id" :data="issue" />
        </draggable>
      </b-card>
    </div>
  </div>
</template>

<script>
import issue from "@/components/issue.vue";
import testdata from "@/assets/release-issues.json";
import draggable from "vuedraggable";
import axios from "axios";

import { splitIssues, sectionToMarkdown } from "@/components/util";

export default {
  name: "release",
  components: {
    draggable,
    issue
  },

  data() {
    return {
      org: "unknown",
      repo: "unknown",
      version: "unknown",
      issuesSectioned: splitIssues(testdata)
    };
  },

  created() {
    this.fetchData();
  },

  watch: {
    $route: "fetchData"
  },

  methods: {
    issuesToMarkdown: function() {
      var ret = "";
      for (var section in this.issuesSectioned) {
        ret += "# " + section + "\n";
        ret += sectionToMarkdown(this.issuesSectioned[section]);
      }
      return ret;
    },
    fetchData() {
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
          this.issuesSectioned = splitIssues(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>


