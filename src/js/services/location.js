async function getCountries(){
const res = await 
}

/**
 * function to get country list ad cities list
 * @param {string} country_code 
 */
export function location(country_code) {
  if (!country_code) {
    getCountries();
  } else
    getCities(country_code);
}
