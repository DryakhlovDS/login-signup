import 'core-js/stable';
import 'regenerator-runtime/runtime';

import 'bootstrap/dist/css/bootstrap.css'
import '../css/style.scss';

import ui from './config/ui.config';
import {
  validate
} from './helpers/validate';
import {getDataForm} from './helpers/dataForm';
import {
  showInputError,
  removeInputError
} from './views/form';
import {
  showNotify
} from './views/notify';
import {
  login
} from './services/auth';


const [{
  formLogin,
  loginUI,
  passUI
}, {
  formSignup
}] = ui;

let inputs = document.querySelectorAll('input.form-control');
console.log(inputs);

formLogin.addEventListener('submit', e => {
  e.preventDefault();
  onSubmit(e.target);
});

formSignup.addEventListener('submit', e => {
  e.preventDefault();
  onSubmit(e.target);
});

inputs.forEach(input => {
  input.addEventListener('focus', () => {
    removeInputError(input);
  })
})

async function onSubmit(formUI) {
  inputs = Array.from(formUI.getElementsByClassName('form-control'));

  inputs.forEach(input => {
    removeInputError(input);
  });
  
  let data = getDataForm(formUI);

  let isValidForm = inputs.every(input => {
    const isValidInput = validate(input);
    if (!isValidInput) {
      showInputError(input);
    }
    return isValidInput;
  });

  if (!isValidForm) return;

  // let data = getDataForm(formUI);
  
  // showNotify({message: 'Login Error! Try again.', class: 'alert-danger'});
  try {
    const res = await login(data);
    //show notify-success
    showNotify({
      msg: 'Login Sucsess!',
    });
  } catch (error) {
    //show notify-alert
    showNotify({
      msg: 'Login Error! Try again.',
      className: 'alert-danger',
      // timeout: 5000,
    });
  }
  formUI.reset();
}