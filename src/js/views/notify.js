function containerTemplate() {
  return '<div class="alert-container"></div>';
}

function creatContainer() {
  const container = containerTemplate();
  document.body.insertAdjacentHTML('afterbegin', container);
}

function getContainer() {
  return document.querySelector('.alert-container');
}

function creatAlert(msg, className, index) {
  return `
<div class="alert ${className}" data-index="${index}" role="alert">
      ${msg}
    </div>
`;
}

function getAlerts() {
  return document.querySelectorAll('.alert').length;
}

function hideAlert(element) {
  element.style.opacity = 0;
}

function insertAlert(alert) {
  const container = getContainer();
  container.insertAdjacentHTML('afterbegin', alert);
}

function closeNotify(index) {
  let alert;
  const container = getContainer();
  if (index === undefined) {
    alert = container.querySelector('.alert');
  } else {
    alert = container.querySelector(`.alert[data-index="${index}"]`);
  }

  if (!alert) {
    // eslint-disable-next-line no-console
    console.warn('Alert not found');
    return;
  }

  hideAlert(alert);
  setTimeout(() => {
    container.removeChild(alert);
    if (getAlerts()) return;
    document.body.removeChild(container);
  }, 1000);
}

/**
 *
 * @param {Object} param
 * @param {string} param.msg
 * @param {string} param.className
 * @param {number} param.time
 */
export default function showNotify({
  msg = 'Some text',
  className = 'alert-success',
  time = 2500,
} = {}) {
  if (!getContainer()) {
    creatContainer();
  }
  let timeout = time - 1000;
  if (timeout < 0) timeout = 0;
  const index = getAlerts();
  const alert = creatAlert(msg, className, index);
  insertAlert(alert);
  setTimeout(() => closeNotify(index), timeout);
}
