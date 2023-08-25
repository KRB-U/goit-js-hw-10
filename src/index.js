import axios from 'axios';
const elements = {
  list: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};
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
  elements.loader.style.display = 'none';
  elements.list.style.display = 'block';
});

function createMarkup(arr) {
  return arr
    .map(item => `<option value="${item.id}">${item.name}</option>`)
    .join('');
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      if (response.data.length === 0) {
        throw error;
      }
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
}

elements.list.addEventListener('change', onChange);

function onChange(evt) {
  elements.loader.style.display = 'block';
  elements.catInfo.style.display = 'none';

  const catId = evt.target.value;

  fetchCatByBreed(catId)
    .then(resp => {
      createMarkupCats(resp);
      elements.loader.style.display = 'none';
      elements.catInfo.style.display = 'block';
    })
    .catch(err => {
      console.log(err);
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
