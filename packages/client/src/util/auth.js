import axios from 'axios';
import store from '../store';

export const checkAuth = () => {
  if (localStorage.auth) {
    let auth;
    try {
      auth = JSON.parse(localStorage.auth);
    } catch (err) {
      console.error(err);
      store.commit('remove');
    }
    if (auth) {
      axios
        .get(`${process.env.VUE_APP_API_ORIGIN}/v1/users/account`, {
          headers: { Authorization: `Bearer ${auth.token}` }
        })
        .then(response => response.data.data)
        .then(auth => {
          store.commit('update', auth);
        })
        .catch(err => {
          console.error(err);
          store.commit('remove');
        });
    }
  }
}