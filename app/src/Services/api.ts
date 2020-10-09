/* eslint-disable consistent-return */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import axios from 'axios';
import Config from '../Global/Config';
import authStore from '../Store/authStore'
class API {
  constructor() {
    axios.defaults.baseURL = Config.baseUrl;
    // Use this to inject anything with all the request
    axios.interceptors.request.use(
      async (config) => {
        const token = sessionStorage.getItem('token');
        if (token) {
          const item = { ...config };
          item.headers.Authorization = `Bearer ${token}`;
          return item;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      },
    );
    axios.interceptors.response.use((response) => response, (error) => {
      if (error && error.response && error.response.status === 403) {
        authStore.signOut();
        return;
      }
      return Promise.reject(error);
    });
  }
  async get(url:string) {
    return axios.get(url);
  }
  async post(url: string, data: any) {
    return axios.post(url, data);
  }
  async put(url: string, data: any) {
    return axios.put(url, data);
  }
  async delete(url: string) {
    return axios.delete(url);
  }
}
export default new API();