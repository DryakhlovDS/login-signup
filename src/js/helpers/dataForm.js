/**
 * Function translate FormData into object
 * @param {HTMLElement} form
 */
export function getDataForm(form) {
  const data = new FormData(form);
  const formData = {};

  for (const pair of data.entries()) {
    Object.assign(formData, {
      [pair[0]]: pair[1],
    });
  }
  return formData;
}
