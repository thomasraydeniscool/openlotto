<template>
  <div class="home">
    <h1 class="logo">OpenLotto</h1>
    <Draw :draw="draw" />
  </div>
</template>

<script>
import axios from 'axios';
import Draw from '@/components/Draw.vue';
import { socket } from '../util/socket.js';
import EventBus from '../util/event-bus.js';

socket.on('new bet', function(bet) {
  EventBus.$emit('newBet', bet)
});

export default {
  data: () => {
    return {
      draw: null
    };
  },
  components: {
    Draw
  },
  methods: {
    getActiveDraw: function() {
      axios
        .get(`${process.env.VUE_APP_API_ORIGIN}/v1/draws/active`)
        .then(response => response.data.data)
        .then(draw => {
          this.draw = draw;
        });
    }
  },
  mounted() {
    EventBus.$on('newBet', (bet) => {
      this.getActiveDraw();
    });
  },
  created: function() {
    this.getActiveDraw();
  }
};
</script>

<style lang="scss" scoped>
.home {
  text-align: center;
}
</style>
