import * as axios from 'axios';

export const API = {
  saveForm(data) {
    return axios
      .post('https://event-backend-nodejs.glitch.me/save', { ...data })
      .then(res => res.status)
      .catch(error => {
        throw new Error(error);
      });
  }
};
