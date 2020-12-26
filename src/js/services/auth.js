import axios from '../plugins/axios';

/**
 * Function login. make login in api
 * @param {string} email 
 * @param {string} password 
 */
export async function login(email, password) {
  try {
    const response = await axios.post(`/auth/login`, JSON.stringify({
      email,
      password
    })
    );

    return response;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}