function inputMessageTemplate(msg) {
  return `
<div class="invalid-feedback">
        ${msg}
      </div>
`
}

function creatList({left, top, width, height}, vh){
  const ul = document.createElement('ul');
  ul.classList.add('autocomplete');
  const listTop = top + height + 5;
  ul.style = `left: ${left}px; top: ${listTop}px; width: ${width}px; max-height: ${vh - listTop - 20}px;`
  return ul;
}

function creatListElement(text){
return `
<li>${text}</li>
`
}

function removeElement(elem){
  const parent = elem.parentElement;
  parent.removeChild(elem);
}

/**
 * 
 * @param {HTMLElement} el 
 */
export function showInputError(el) {
  const parent = el.parentElement;
  const msg = el.dataset.invalidMessage || 'Invalid input';
  const template = inputMessageTemplate(msg);
  el.classList.add('is-invalid');
  parent.style = 'margin-bottom: 0';
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
  parent.style = '';
  parent.removeChild(err);
  // err.remove();
}

/**
 * 
 * @param {HTMLElement} el 
 * @param {massive} list 
 */
export function showList(el, list){
//найти координаты элемента
const coords = el.getBoundingClientRect();
const vh = window.innerHeight;

//сформировать список из переменной list
const ul = creatList(coords, vh);

list.forEach(str => {
  const li = creatListElement(str);
  ul.insertAdjacentHTML('beforeend', li);
});

//добавить на экран в абсолюте список
deleteAutocomplete();

document.body.appendChild(ul);
}

/**
 * 
 */
export function deleteAutocomplete(){
  const autocomplete = document.querySelector('ul.autocomplete');
  if (autocomplete){
    removeElement(autocomplete);
  }
}