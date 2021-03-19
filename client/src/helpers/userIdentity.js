import axios from 'axios';
import store from '@/store';

export function isEmpty(value){
  return value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
};

export const getUserIdentity = async (next) => {
  if (localStorage.getItem('authenticationToken')) {
    if (isEmpty(store.getters.getUserData)) {
      const response = await axios.get('/api/user/current');
        if (response.data) {
          await store.dispatch('remitAuthStatee', true);
          await store.dispatch('saveUser', respose.data);
          next();
        }
    } else {
      next();
    }
  } else {
    next();
  }
};

