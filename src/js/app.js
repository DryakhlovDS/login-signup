import 'core-js/stable';
import 'regenerator-runtime/runtime';

import 'bootstrap/dist/css/bootstrap.css'
import '../css/style.scss';

import ui from './config/ui.config';
import {
  validate
} from './helpers/validate';
import {
  getDataForm
} from './helpers/dataForm';
import {
  showInputError,
  removeInputError,
  showList,
  deleteAutocomplete,
} from './views/form';
import {
  showNotify
} from './views/notify';
import {
  login,
  signup
} from './services/auth';
import {
  location
} from './services/location';

document.addEventListener('DOMContentLoaded', e => {

  const [{
    formLogin,
    loginUI,
    passUI
  }, {
    formSignup
  }] = ui;

  let inputs = document.querySelectorAll('input.form-control');
  let countries, cities, MassiveCountries;
  const inputCountry = document.querySelector('#country');
  const inputCity = document.querySelector('#city');


  initAc();


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

  inputCountry.addEventListener('input', e => {
    const str = e.target.value;
    console.log(str);
    if (!str) {
      deleteAutocomplete();
      return;
    }
    const country = MassiveCountries.filter(item => item.includes(str));
    showList(e.target, country);

  });

  async function onSubmit(formUI) {
    inputs = Array.from(formUI.getElementsByClassName('form-control'));

    inputs.forEach(input => {
      removeInputError(input);
    });

    let data = getDataForm(formUI);

    const isValidForm = inputs.every(input => {
      let isValidInput = validate(input);
      if (input.id === 'confirmPassword') {
        const pass = formUI.querySelector('#signupPassword');
        isValidInput = input.value === pass.value;
      }
      if (!isValidInput) {
        showInputError(input);
      }
      return isValidInput;
    });

    if (!isValidForm) return;

    // let data = getDataForm(formUI);

    if (formUI.name === 'loginForm') {
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
    }



    formUI.reset();
  }

  async function initAc() {
    countries = await location();


    MassiveCountries = Object.keys(countries);
    console.log(MassiveCountries);

    cities = await location(120);
    // console.log(cities);
  }

});