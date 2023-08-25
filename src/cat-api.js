import axios from 'axios';
import { elements } from '.';

function fetchBreeds() {
  return axios
    .get(`https://api.thecatapi.com/v1/breeds`)
    .then(resp => resp.data)
    .catch(function (error) {
      console.log(error);
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
      console.log(err);
    });
}

export { fetchBreeds, fetchCatByBreed };
