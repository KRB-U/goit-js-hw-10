import axios from 'axios';
import { elements } from '.';
import { Notify } from 'notiflix';

axios.defaults.headers.common['x-api-key'] =
  'live_NzqVk2Lk8XZBAri0CPIevLCyJd9M5NVP4r6FWzM4LBnTdRZi4cQ84F5TFDeRoxV2';

function fetchBreeds() {
  return axios
    .get(`https://api.thecatapi.com/v1/breeds`)
    .then(resp => resp.data)
    .catch(function (error) {
      Notify.failure(error.message);
    });
  // .finally(function () {
  // });
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      console.log(response);
      if (response.data.length === 0) {
        throw error;
      }
      return response.data;
    })
    .catch(err => {
      Notify.failure(err.message);
    });
}

export { fetchBreeds, fetchCatByBreed };
