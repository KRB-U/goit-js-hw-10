import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

export const elements = {
  list: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

// console.log(elements.list);

fetchBreeds()
  .then(resp => {
    elements.list.innerHTML = createMarkup(resp);
    // elements.loader.style.display = 'none';
    elements.list.style.display = 'block';
  })
  .catch(err => {
    elements.error.style.display = 'block';
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

  fetchCatByBreed(catId)
    .then(resp => {
      // console.log(resp);
      createMarkupCats(resp);
      // elements.loader.style.display = 'none';
      elements.catInfo.style.display = 'block';
      elements.error.style.display = 'none';
    })
    .catch(err => {
      elements.error.style.display = 'block';
    });
}

function createMarkupCats(cats) {
  cats.map(cat => {
    const { temperament, description, name } = cat.breeds[0];
    return (elements.catInfo.innerHTML = `<img src="${cat.url}" alt="${name}" height:'200' width ='250'/>
        <div class = "box">
           <h2>${name}</h2>
           <p>${description}</p>
           <p><b>Temperament:</b> ${temperament}</p>
         </div>`);
  });
}
