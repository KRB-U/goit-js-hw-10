import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

export const elements = {
  list: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

// console.log(elements.list);

fetchBreeds()
  .then(resp => {
    elements.list.innerHTML = createMarkup(resp.data);
    elements.loader.style.display = 'none';
    elements.list.style.display = 'block';
  })
  .catch(err => {
    elements.error.style.display = 'block';
    // Notify.failure(err.message);
    Report.failure(
      'Notiflix Failure',
      '"Oops! Something went wrong! Try reloading the page!"',
      'Okay'
    );
  });

function createMarkup(arr) {
  return arr
    .map(item => `<option value="${item.id}">${item.name}</option>`)
    .join('');
}

elements.list.addEventListener('change', onChange);

function onChange(evt) {
  elements.loader.style.display = 'block';
  elements.catInfo.style.display = 'none';

  const catId = evt.target.value;
  console.log(catId);
  fetchCatByBreed(catId)
    .then(resp => {
      if (resp.data.length === 0) {
        throw error;
      }
      // console.log(resp);
      createMarkupCats(resp.data);
      elements.catInfo.style.display = 'flex';
      elements.loader.style.display = 'none';
      elements.error.style.display = 'none';
    })
    .catch(err => {
      elements.error.style.display = 'block';
      elements.loader.style.display = 'none';
      Report.failure(
        'Notiflix Failure',
        '"Oops! Something went wrong! Try reloading the page!"',
        'Okay'
      );
    });
}

function createMarkupCats(cats) {
  cats.map(cat => {
    const { temperament, description, name } = cat.breeds[0];
    return (elements.catInfo.innerHTML = `<img src="${cat.url}" alt="${name}"  width = 300/>
        <div class = "box">
           <h2>${name}</h2>
           <p>${description}</p>
           <p><b>Temperament:</b> ${temperament}</p>
         </div>`);
  });
}
