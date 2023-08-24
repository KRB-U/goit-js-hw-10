import axios from 'axios';
const elements = {
  list: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};
console.log(elements.list);
axios.defaults.headers.common['x-api-key'] =
  'live_NzqVk2Lk8XZBAri0CPIevLCyJd9M5NVP4r6FWzM4LBnTdRZi4cQ84F5TFDeRoxV2';

function fetchBreeds() {
  return axios
    .get(`https://api.thecatapi.com/v1/breeds`)
    .then(resp => resp.data)
    .catch(function (error) {
      console.log(error);
    });
  // .finally(function () {
  //   // выполняется всегда
  // });
}

fetchBreeds().then(resp => {
  elements.list.innerHTML = createMarkup(resp);
});

function createMarkup(arr) {
  return arr
    .map(item => `<option value="${item.id}">${item.name}</option>`)
    .join('');
}
