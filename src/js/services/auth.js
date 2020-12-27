import axios from '../plugins/axios';

/**
 * Function login. make login in api
 * @param {string} email 
 * @param {string} password 
 */
export async function login(data) {
  try {
    const response = await axios.post(`/auth/login`,JSON.stringify(data) );

    return response;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}