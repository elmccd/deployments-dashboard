<template>
  <div class="block" :class="data.build.status">
    <h1>{{data.id}}</h1>
    <h2 v-show="data.build.id">
      Build:
      <a target="_blank" :href="data.build.link">#{{data.build.id}}</a>
    </h2>

    <i class="fa fa-4x" :class="statusIconClass"></i>

    <p>
      {{data.build.status === 'pending' ? 'Building for' : 'Built'}}
      <b>{{builtRelative}}</b>
    </p>

    <p>Status: <b>{{data.build.status_message}}</b></p>
    <p>Author: <b>{{data.build.author}}</b></p>
    <p>Deployed by: <b>{{data.build.committer}}</b></p>
    <p>
      Message:
      <i>{{data.build.message}}</i>
    </p>

    <p v-show="shortCommit">
      on commit:
      <a target="_blank" :href="data.build.compare_url">{{shortCommit}}</a>
    </p>

    <a :href="data.destination" class="block-link">{{data.destination}}</a>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'ServerBlock',
  props: ['data'],
  data() {
    return {
      now: Date.now(),
    };
  },
  created() {
    setInterval(() => {
      this.now = Date.now();
    }, 1000);
  },
  computed: {
    shortCommit() {
      return this.data.build.commit ? this.data.build.commit.substr(0, 6) : null;
    },
    builtRelative() {
      if (this.data.build.status === 'pending') {
        return moment.utc(moment(this.now).diff(moment(this.data.timestamp))).format('HH:mm:ss');
      }

      return moment(this.data.timestamp).fromNow();
    },
    statusIconClass() {
      return {
        Errored: 'fa-exclamation-circle',
        Broken: 'fa-exclamation-triangle',
        fail: 'fa-exclamation-circle',
        Failed: 'fa-exclamation-circle',
        'Still Failing': 'fa-exclamation-circle',
        Canceled: 'fa-ban',
        Pending: 'fa-pulse fa-spinner',
        pending: 'fa-pulse fa-spinner',
        Fixed: 'fa-wrench',
        Passed: 'fa-check',
        success: 'fa-check',
      }[this.data.build.status_message || this.data.build.status] || 'fa-question';
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  $success: #45a356;
  $pending: #ef9b1e;
  $fail: #da4c38;

  h1, h2 {
    margin: 0.5rem 0;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .block {
    max-width: 20rem;
    padding: 1rem;
    color: #fff;
    margin: 1rem;
    position: relative;
    background: #666;
  }

  .fa {
    position: absolute;
    right: 1rem;
    top: 1rem;
    opacity: 0.8;
  }

  .pending {
    background: $pending;
  }
  .fail {
    background: $fail;
  }
  .success {
    background: $success;
  }

  a {
    color: #fff;
    font-weight: bold;
  }

  .block-link {
    box-sizing: border-box;
    display: block;
    padding: 1rem 0;
    font-size: 1.2rem;
  }
</style>
