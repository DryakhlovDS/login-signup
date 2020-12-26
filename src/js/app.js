import 'core-js/stable';
import 'regenerator-runtime/runtime';

import 'bootstrap/dist/css/bootstrap.css'
import '../css/style.scss';

import ui from './config/ui.config';
import {
  validate
} from './helpers/validate';
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


const {
  formUI,
  loginUI,
  passUI
} = ui;
const inputs = [loginUI, passUI];

formUI.addEventListener('submit', e => {
  e.preventDefault();
  onSubmit();
});

inputs.forEach(input => {
  input.addEventListener('focus', () => {
    removeInputError(input);
  })
})

async function onSubmit() {
  inputs.forEach(input => {
    removeInputError(input);
  });

  let isValidForm = inputs.every(input => {
    const isValidInput = validate(input);
    if (!isValidInput) {
      showInputError(input);
    }
    return isValidInput;
  });

  if (!isValidForm) return;

  // showNotify({message: 'Login Error! Try again.', class: 'alert-danger'});
  try {
    const res = await login(loginUI.value, passUI.value);
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