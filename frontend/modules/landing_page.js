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

  let cardBlock = document.createElement('div');
  cardBlock.className ="main col-3 col-md-3"

  cardBlock.innerHTML =
    `<a href="pages/adventures/?city=${id}" id="${id}">
      <div class="tile">
        <div class="tile-text">
          <h2>${city}</h2>
          <p>${description}</p>
        </div>
        <img src="${image}"></img>
      </div>
    </a>`;
  
  let dataBlock = document.getElementById('data');
  dataBlock.appendChild(cardBlock);

}

export { init, fetchCities, addCityToDOM };
