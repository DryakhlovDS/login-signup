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
  capitalize
} from './helpers/capitalize';
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
  let countries, cities, massiveCountries, massiveCities;
  const inputCountry = document.querySelector('#country');
  const inputCity = document.querySelector('#city');


  initCountry();


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
    onInput(e.target, massiveCountries);
    isValueCorrect(e.target.value, Object.keys(countries));

  });

  inputCity.addEventListener('input', e => {
    onInput(e.target, massiveCities);
  });

  document.body.addEventListener('click', e => {

    if (e.target.classList.contains('list-group-item-action')) {
      e.preventDefault();
      const input = onClickList(e.target);
      if (input === inputCountry) isValueCorrect(input.value, Object.keys(countries));
      deleteAutocomplete();
    }
  });

  async function onSubmit(formUI) {
    inputs = Array.from(formUI.getElementsByClassName('form-control'));

    inputs.forEach(input => {
      removeInputError(input);
    });

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

    let data = getDataForm(formUI);

    if (formUI.name === 'loginForm') {
      try {
        const res = await login(data);
        //show notify-success
        showNotify({
          msg: 'Login Sucsess!',
          // timeout: 10000,
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

    if (formUI.name === 'signupForm') {
      try {
        console.log(data);
        const res = await signup(data);
        console.log(res);
        //show notify-success
        showNotify({
          msg: res.message,
          timeout: 15000,
        });
      } catch (error) {
        //show notify-alert
        showNotify({
          msg: 'Sign up error! Try again.',
          className: 'alert-danger',
          // timeout: 5000,
        });
      }
    }

    formUI.reset();
    inputCity.disabled = true;
  }

  async function initCountry() {
    countries = await location();
    massiveCountries = Object.keys(countries).reduce((acc, string) => {
      acc.push(string.toLowerCase());
      return acc;
    }, []);

  }

  async function initCity(code) {
    cities = await location(code);
    massiveCities = Object.values(cities).reduce((acc, string) => {
      acc.push(string.toLowerCase());
      return acc;
    }, []);
  }

  function onInput(input, fullList) {
    const str = input.value.toLowerCase();

    if (!str) {
      deleteAutocomplete();
      return;
    }

    const country = fullList.filter(item => item.includes(str));
    showList(input, country);
  }

  function onClickList(target) {
    const text = capitalize(target.textContent, true);
    const parent = target.parentElement;
    const inputId = parent.dataset.location;
    const input = document.querySelector(`#${inputId}`);
    input.value = text;
    return input;
  }

  function isValueCorrect(value, countryList) {
    const cityDisabled = searchValue(value, countryList);
    inputCity.disabled = cityDisabled;
    inputCity.value = '';
    if (!cityDisabled) {
      const code = countries[value].code;
      initCity(code);
    }

  }

  function searchValue(value, massive) {
    if (!value) return true;
    const res = massive.find(country => country === value);
    return !res;
  }

});