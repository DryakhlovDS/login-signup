const regExpDic = {
email: /.+@.+\..+/i,
password: /^[0-9a-zA-Z]{4,}$/,
}
/**
 * 
 * @param {HTMLInputElement} el 
 * @returns {Boolean} - return true if input valid
 */
export function validate(el){
  const regExpName = el.dataset.required;
  if (!regExpDic[regExpName]) return true;
  return regExpDic[regExpName].test(el.value);
}