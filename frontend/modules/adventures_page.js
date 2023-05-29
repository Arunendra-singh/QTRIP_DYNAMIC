
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it


  let obj = new URLSearchParams(search)
  return obj.get('city')
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data


  try {
  
    let res = await fetch(config.backendEndpoint + `/adventures?city=${city}`)
    let adventures = await res.json();
    return adventures;
  
  } catch (err) {
    console.log(err);
  
    return null;
  }



}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES

  // 1. Populate the Adventure Cards and insert those details into the DOMclear

  document.getElementById('data').textContent = "";

  adventures.forEach(({id, name, costPerHead, duration, category, currency, image}) => {

    let card = document.createElement('div')

    card.className = 'col-6 col-lg-3 position-relative';

    card.innerHTML = 
    `<a href="detail/?adventure=${id}" id="${id}">
      <div class="category-banner">
        ${category}
      </div>
      <div class="activity-card">
          <img src="${image}" alt="">
          <div class="d-flex w-100 justify-content-between px-2">
              <h3>${name}</h3>
              <h3>${currency}costPerHead${costPerHead}</h3>
          </div>

          <div class="d-flex w-100 justify-content-between px-2">
            <h5>Duration</h5>
            <h5>${duration} Hours</h5>
        </div>
      </div>
    </a>`;
    document.getElementById('data').appendChild(card);
    
  })
  // 1. Populate the Adventure Cards and insert those details into the DOM

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

  
  return list.filter((adventures) => adventures.duration >= low && adventures.duration <= high)

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

  return list.filter(adv => categoryList.indexOf(adv.category) > -1)

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods


  if (filters.duration && filters.category.length){
    let filteredList = filterByDuration(list, parseInt(filters.duration.split('-')[0]), parseInt(filters.duration.split('-')[1]))
    return filterByCategory(filteredList, filters.category)
  }

  if (filters.duration){
    let choice = filters.duration.split('-');
    
    return filterByDuration(list, parseInt(choice[0]), parseInt(choice[1]));
  }

  if (filters.category.length){

    return filterByCategory(list, filters.category);
  }


  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage

  localStorage.setItem('filters', JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  return JSON.parse(localStorage.getItem('filters'));
  
  // return JSON.parse(localStorage.getItem('filters'))


  // Place holder for functionality to work in the Stub
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

  (filters.category).forEach((key) => {
    let ele = document.createElement('div');
    ele.className = "category-filter"
    ele.innerHTML = `
      <div>${key}</div>
    `
    document.getElementById('category-list').appendChild(ele);
  })


}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
