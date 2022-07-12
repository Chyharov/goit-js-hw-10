import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';
import MarkupForCountry from './templates/templates_country.hbs';
import MarkupForCountries from './templates/templates_countries.hbs';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const divForInfoEl = document.querySelector('.country-info');
const ulForInfoEl = document.querySelector('.country-list');

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  const valueInput = event.target.value.trim();

  if (!valueInput) {
    clearMarkup();
    return;
  }

  fetchCountries(valueInput)
    .then(countries => {
      clearMarkup();

      if (countries.length > 10) {
        showInfo(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }

      if (countries.length <= 10 && countries.length >= 2) {
        ulForInfoEl.innerHTML = MarkupForCountries(countries);
        return;
      }

      divForInfoEl.innerHTML = MarkupForCountry(countries[0]);
      return;
    })
    .catch(error => {
      clearMarkup();
      showFail(error);
    });
}

function clearMarkup() {
  divForInfoEl.innerHTML = '';
  ulForInfoEl.innerHTML = '';
}

function showInfo(message) {
  Notiflix.Notify.info(message);
}

function showFail(message) {
  Notiflix.Notify.failure(message);
}
