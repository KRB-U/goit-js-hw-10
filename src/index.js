import axios from 'axios';
const elements = {
  list: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

// import { fetchBreeds } from './js/cat-api';

// const headers = new Headers({
//   'Content-Type': 'application/json',
//   'X-Custom-Header': 'custom value',
//   breed_ids: '1',
// });

axios.defaults.headers.common['x-api-key'] =
  'live_NzqVk2Lk8XZBAri0CPIevLCyJd9M5NVP4r6FWzM4LBnTdRZi4cQ84F5TFDeRoxV2';

function fetchBreeds() {
  return axios
    .get(`https://api.thecatapi.com/v1/breeds`)
    .then(function (response) {
      console.log(response.data);
      // обработка успешного запроса
      // console.log(response);
    })
    .catch(function (error) {
      // обработка ошибки
      // console.log(error);
    })
    .finally(function () {
      // выполняется всегда
    });
}
fetchBreeds().then(resp => {});

function createMarkup(arr) {
  return arr
    .map(item => {
      `<option value="${item.id}">${item.name}</option>`;
    })
    .join('');
}
