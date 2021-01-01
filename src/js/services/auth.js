import axios from '../plugins/axios';

/**
 * Function login. make login in api
 * @param {object} data 
 */
export async function login(data) {
  try {
    const response = await axios.post(`/auth/login`, JSON.stringify(data) );

    return response;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}

/**
 * Function for sign Up, make sign uo in api
 * @param {object} data 
 */
export async function signup(data) {
  try {
    const response = await axios.post(`/auth/signup`,JSON.stringify(data) );

    return response;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}