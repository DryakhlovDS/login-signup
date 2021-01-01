import axios from '../plugins/axios';

async function getCountries() {
  const res = await axios.get('/location/get-countries');
  const countries = Object.entries(res).reduce((obj, [key, value]) => {
    obj[value] = {
      name: value,
      code: key,
    };
    return obj;
  }, {});
  return countries;
}

async function getCities(code) {
  const res = await axios.get(`location/get-cities/${code}`);

  return res;
}

/**
 * function to get country list ad cities list
 * @param {string} country_code
 */
export function location(country_code) {
  let massive;
  if (!country_code) {
    massive = getCountries();
  } else {
    massive = getCities(country_code);
  }
  return massive;
}
