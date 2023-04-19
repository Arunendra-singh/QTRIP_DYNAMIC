import config from "../conf/index.js";

async function init() {
  // console.log('from init()');
  // console.log(config);
  debugger;
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
    
  }
}



//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data

  const dataurl = `${config.backendEndpoint + "/cities"}`;

  try {
      let result = await fetch(dataurl);

      result = await result.json();

      console.log(result);

      return result;

  } catch (err) {
    
    return null;
  }
  
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let divBlock = document.createElement('div');
  divBlock.classList.add('col-md-3');

  let card = document.createElement('div');

  card.id = id;
  card.classList.add('card');

  let name = document.createElement('h2');
  name.textContent = city;
  card.appendChild(name);

  let des = document.createElement('p');
  des.textContent = description;
  card.appendChild(des);

  let img = document.createElement('img');
  img.src = image;
  card.appendChild(img);

  divBlock.appendChild(card);

  let dataBlock = document.getElementById('data');
  dataBlock.appendChild(divBlock);

}

export { init, fetchCities, addCityToDOM };
