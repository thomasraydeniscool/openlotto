<template>
  <div class="draw">
    <span class="number">Draw #{{ draw ? draw.number : null }}</span>
    <h1 class="pot">{{ pot }}</h1>
    <span>Tokens</span>
    <div class="bet-container" v-if="auth">
      <button title="Enter this draw." class="bet btn primary" type="button" @click.prevent="bet">{{ loading ? 'Loading...' : 'Bet 100 Tokens' }}</button>
    </div>
    <div class="form-message error" v-for="error of errors" :key="error">{{ error }}</div>
  </div>
</template>

<script>
import axios from 'axios';
import { checkAuth } from '../util/auth.js';

export default {
  name: 'Draw',
  props: ['draw'],
  data: () => {
    return {
      loading: false,
      errors: []
    };
  },
  methods: {
    bet: function() {
      if (this.$store.state.auth) {
        const { auth } = this.$store.state;
        const data = {
          draw: this.draw,
          amount: 100
        };
        this.loading = true;
        axios
          .post(`${process.env.VUE_APP_API_ORIGIN}/v1/bets`, data, {
            headers: { Authorization: `Bearer ${auth.token}` }
          })
          .then(response => response.data.data)
          .then(bet => {
            this.$emit('betted');
            checkAuth();
            this.loading = false;
          })
          .catch(err => {
            this.errors.push(err.message);
            this.loading = false;
            setTimeout(() => {
              this.errors = [];
            }, 2000);
          });
      }
    }
  },
  computed: {
    pot() {
      if (this.draw && this.draw.bets) {
        return this.draw.bets
          .map(bet => bet.amount)
          .reduce((prev, amount) => prev + amount, 0);
      }
      return 0;
    },
    auth() {
      return this.$store.state.auth ? this.$store.state.auth : null;
    }
  }
};
</script>


<style lang="scss" scoped>
.number {
  display: block;
}
.pot {
  font-size: 42pt;
  margin-top: 5px;
  margin-bottom: 5px;
}
.bet-container {
  display: flex;
  justify-content: center;
}
.bet {
  margin-top: 40px;
}
</style>
