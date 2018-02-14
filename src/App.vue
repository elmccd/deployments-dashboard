<template>
  <div id="app">
    <template v-if="state === 'loaded'">
      <ServerBlock v-for="item in servers" :data="item" :key="item.id"/>
    </template>
    <div v-else class="error">
      Looks like there is no servers to list.<br/>
      Trigger build results to see something here.
    </div>
  </div>
</template>

<script>
import ioClient from 'socket.io-client';
import ServerBlock from './components/ServerBlock';

export default {
  name: 'App',
  components: {
    ServerBlock,
  },
  data() {
    return {
      servers: {},
      state: 'initial',
    };
  },
  created() {
    const io = ioClient({ path: '/ws' });

    io.on('status', (data) => {
      this.$set(this.servers, [data.id], data);
      this.state = 'loaded';
    });

    io.on('error', (data) => {
      console.log('error', data);
    });

    io.on('connection', (socket) => {
      console.log('connected', socket);
    });
  },
};
</script>

<style>
  body, html {
    margin: 0;
    padding: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    flex-wrap: wrap;
  }

  .error {
    display: block;
    text-align: center;
    padding: 1rem;
  }
</style>
