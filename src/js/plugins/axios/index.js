import axios from 'axios';
import api from '../../config/api';
import interceptors from './intercepters';

const instance = axios.create({
  baseURL: api.url,
  headers: {
    'Content-type': 'application/json',
  },
});

interceptors(instance);

export default instance;
