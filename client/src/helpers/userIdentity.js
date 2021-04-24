import axios from 'axios';
import store from '@/store';

export function isEmpty(value) {
  return value === undefined
    || value === null
    || (typeof value === 'object' && Object.keys(value).length === 0)
    || (typeof value === 'string' && value.trim().length === 0);
}

export const getUserIdentity = async (next) => {
  if (localStorage.getItem('authenticationToken')) {
    if (isEmpty(store.getters.getUserData)) {
      const response = await axios.get('http://localhost:3000/api/user/logged');
      if (response.data.data) {
        await store.dispatch('remitAuthState', true);
        await store.dispatch('saveUser', response.data.data);
        next();
      }
    } else {
      next();
    }
  } else {
    next();
  }
};
