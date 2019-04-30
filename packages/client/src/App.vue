<template>
  <div id="app">
    <div class="nav">
      <div class="container">
        <div class="nav-menu">
          <div class="main">
            <ul class="menu">
              <li>OpenLotto</li>
              <li><router-link class="link" to="/">Home</router-link></li>
              <li><router-link class="link" to="/about">What is this?</router-link></li>
            </ul>
          </div>
          <div class="right">
            <ul class="menu" v-if="!auth">
              <li><router-link class="link" to="/login">Login</router-link></li>
              <li><router-link class="btn" to="/register">Get Started</router-link></li>
            </ul>
            <ul class="menu" v-else>
              <li><strong>{{ auth.username }}</strong></li>
              <li>Tokens: {{ auth.tokens }}</li>
              <li><a class="link" @click.prevent="logout">Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout: function(e) {
      this.$store.commit('remove');
    }
  },
  computed: {
    auth() {
      return this.$store.state.auth ? this.$store.state.auth : null;
    }
  }
};
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto+Press');

*,
*:before,
*:after {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  width: 100%;
  font-family: 'Roboto', sans-serif;
  font-size: 12pt;
  background: #252422;
  color: #fffcf2;
  margin: 0;
  padding: 0;
}

p {
  font-size: 13pt;
}

a {
  text-decoration: none;
  &:active, &:visited, &:focus {
    color: inherit;
  }
}

.logo {
  font-size: 35pt;
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

.nav {
  width: 100%;
  background: #403d39;
}

.nav-menu {
  display: flex;
  width: 100%;
  height: 40px;
  color: #fffcf2;
  .menu {
    display: flex;
    height: 100%;
    align-items: center;
    margin: 0;
    padding: 0;
    li {
      list-style: none;
      display: inline-block;
      padding: 0px 5px;
    }
    .link {
      color: #eb5e28;
      cursor: pointer;
      &:hover {
        color: darken(#eb5e28, 10%);
      }
    }
  }
  .right {
    margin-left: auto;
  }
  .btn {
    display: inline-block;
    padding: 5px 10px;
    background: #eb5e28;
    color: #fffcf2;
    cursor: pointer;
    &:hover {
      background: darken(#eb5e28, 5%);
    }
  }
}

.form-input {
  color: #fffcf2;
  width: 100%;
  display: block;
  border: none;
  background: #403d39;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 10px;
}

.form-label {
  display: block;
  padding: 5px 0;
}

.form-message {
  display: block;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  &.error {
    background: red;
    border: 1px solid darken(red, 10%);
  }
}

.btn {
  display: block;
  border-radius: 4px;
  border: none;
  padding: 10px;
  cursor: pointer;
  &.submit {
    width: 100%;
    background: #eb5e28;
    color: #fffcf2;
    &:hover {
      background: darken(#eb5e28, 5%);
    }
  }
  &.primary {
    background: #eb5e28;
    color: #fffcf2;
  }
}
</style>
