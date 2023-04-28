import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let obj = new URLSearchParams(search)
  return obj.get('adventure')
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let res = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`)

    let data = await res.json();
    return data;

  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let {name, subtitle, content, images} = adventure

  document.getElementById('adventure-name').textContent = name;
  document.getElementById('adventure-subtitle').textContent = subtitle;
  document.getElementById('adventure-content').textContent = content;

  images.forEach(src => {
    document.getElementById('photo-gallery').innerHTML += `
    <div>  
    <img src = ${src} class ="activity-card-image">
    </div>
    `
})
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  document.getElementById('photo-gallery').innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators" id = "slide-indicators">
  </div>
  <div class="carousel-inner" id="slides-target">
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `;
images.forEach((src, i) => {
  document.getElementById('slides-target').innerHTML += `
    <div class=" ${'carousel-item' + (i === 0 ? " active" : "")}">
      <img src = ${src} class="d-block w-100" alt="">
    </div>
  `;

  document.getElementById('slide-indicators').innerHTML += `
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" class="${i === 0 ? "active" : "" }" aria-current="true" aria-label="Slide ${i+1}"></button>
  `
})

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
