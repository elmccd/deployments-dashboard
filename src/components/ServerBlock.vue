<template>
  <div class="block" :class="data.build.status">
    <h1>{{data.id}}</h1>
    <h2>Build: <a target="_blank" :href="data.build.link">#{{data.build.id}}</a></h2>

    <i class="fa fa-4x" :class="statusIconClass"></i>

    <p>
      {{data.build.status === 'pending' ? 'Building for' : 'Built'}}
      <b>{{builtRelative}}</b>
    </p>

    <p>on commit: <a :href="data.build.commitLink">{{shortCommit}}</a></p>

    <a :href="data.destination" class="block-link">{{data.destination}}</a>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'ServerBlock',
  props: ['data'],
  computed: {
    shortCommit() {
      return this.data.build.commit.substr(0, 6);
    },
    builtRelative() {
      return moment(this.data.timestamp).fromNow();
    },
    statusIconClass() {
      console.log('this.data', this.data);
      return {
        fail: 'fa-exclamation-circle',
        pending: 'fa-pulse fa-spinner',
        success: 'fa-check',
      }[this.data.build.status];
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
