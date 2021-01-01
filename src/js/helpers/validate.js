const regExpDic = {
  email: /.+@.+\..+/i,
  password: /^[0-9a-zA-Z]{4,}$/,
  'first-name': /^[a-zA-Z]{1,}$/,
  'last-name': /.{1,}$/,
  country: /.{2,}$/,
  city: /.{2,}$/,
  date_of_birth_day: /^[0-9]{2,2}$/,
  date_of_birth_year: /^[0-9]{4,4}$/,
  date_of_birth_month: /^[0-9]{2,2}$/,
  phone: /^[0-9]{11,11}$/,
};
/**
 *
 * @param {HTMLInputElement} el
 * @returns {Boolean} - return true if input valid
 */
export function validate(el) {
  const regExpName = el.dataset.required;
  if (!regExpDic[regExpName]) return true;
  return regExpDic[regExpName].test(el.value);
}
