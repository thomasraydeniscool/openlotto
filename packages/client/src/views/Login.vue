<template>
<form class="form" @submit.prevent="onSubmit">
  <h1 class="title">Login</h1>
  <p class="hint">Welcome back</p>
  <label class="form-label" for="username">Username</label>
  <input class="form-input" type="text" name="username" id="username" placeholder="Username" v-model="username">
  <label class="form-label" for="password">Password</label>
  <input class="form-input" type="password" name="password" id="password" placeholder="Password" v-model="password">
  <button class="btn submit" type="submit">{{ loading ? 'Loading...' : 'Login' }}</button>
  <div class="form-message error" v-for="error of errors" :key="error">
    {{ error }}
  </div>
</form>  
</template>

<script>
import axios from 'axios';

export default {
  data: () => {
    return {
      username: '',
      password: '',
      errors: [],
      loading: false
    };
  },
  methods: {
    onSubmit: function() {
      this.errors = [];

      if (this.username && this.password && !this.loading) {
        this.login();
      }

      if (!this.username) {
        this.errors.push('Username is required.');
      }
      if (!this.password) {
        this.errors.push('Password is required.');
      }
    },
    login: function() {
      this.loading = true;
      const data = {
        username: this.username,
        password: this.password
      };
      axios
        .post(`${process.env.VUE_APP_API_ORIGIN}/v1/users/login`, data)
        .then(response => response.data.data)
        .then(auth => {
          this.loading = false;
          this.$store.commit('update', auth);
          this.$router.push('/');
        })
        .catch(err => {
          this.loading = false;
          this.errors.push(err.message);
        });
    }
  }
}
</script>


<style lang="scss" scoped>
.form {
  width: 300px;
}

.title {
  margin-bottom: 10px;
}

.hint {
  margin-top: 5px;
  color: #999;
}
</style>
