function inputMessageTemplate(msg) {
  return `
<div class="invalid-feedback">
        ${msg}
      </div>
`
}
/**
 * 
 * @param {HTMLElement} el 
 */
export function showInputError(el) {
  const msg = el.dataset.invalidMessage || 'Invalid input';
  const template = inputMessageTemplate(msg);
  el.classList.add('is-invalid');
  el.insertAdjacentHTML('afterend', template);
}

/**
 * @param {HTMLInputElement}
 */
export function removeInputError(el){
  const parent = el.parentElement;
  const err = parent.querySelector('.invalid-feedback');

  if (!err) return;

  el.classList.remove('is-invalid');
  parent.removeChild(err);
  // err.remove();
}