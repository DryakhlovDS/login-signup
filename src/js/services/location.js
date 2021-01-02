import axios from '../plugins/axios';

async function getCountries() {
  const res = await axios.get('/location/get-countries');
  const countries = Object.entries(res).reduce((acc, [key, value]) => {
    acc[value] = {
      name: value,
      code: key,
    };
    return acc;
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
export default function location(countryCode) {
  let massive;
  if (!countryCode) {
    massive = getCountries();
  } else {
    massive = getCities(countryCode);
  }
  return massive;
}
