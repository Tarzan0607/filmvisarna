


const seats = document.querySelectorAll('.seat');
const movieInput = document.querySelector('#movie');
const emailInput = document.querySelector('#email');
const timeInput = document.querySelector('#time');
const ticketTypeInput = document.querySelector('#ticketType');
const bokaNuButton = document.querySelector('#boka-nu');
const showcaseBox = document.querySelector('#showcase');

const container = document.querySelector(".container");

const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById('movie-select');

const selectedMovie = document.getElementById('selected-movie');

let selectedSeat = null;
let bookingInfo = {
  movie: '',
  time: '',
  ticketType: '',
  email: '',
};

populateUI();

let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;

  setMovieData(movieSelect.selectedIndex, movieSelect.value);
}


nameInput.addEventListener('input', () => {
  bookingInfo.name = movieInput.value;
});

emailInput.addEventListener('input', () => {
  bookingInfo.email = emailInput.value;
});

phoneInput.addEventListener('input', () => {
  bookingInfo.phone = timeInput.value;
});

phoneInput.addEventListener('input', () => {
  bookingInfo.phone = ticketTypeInput.value;
});

seats.forEach((seat) => {
  seat.addEventListener('click', () => {
    if (!seat.classList.contains('occupied')) {
      if (selectedSeat) {
        selectedSeat.classList.remove('selected');
      }
      seat.classList.add('selected');
      selectedSeat = seat;
    }
  });
});

// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        console.log(seat.classList.add("selected"));
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
    console.log(selectedMovieIndex)
  }
}

bokaNuButton.addEventListener('click', () => {
  if (selectedSeat) {
    showcaseBox.innerHTML = `
      <p>Plats: ${selectedSeat.dataset.seat}</p>
      <p>Movie: ${bookingInfo.movie}</p>
      <p>E-post: ${bookingInfo.email}</p>
      <p>Time: ${bookingInfo.time}</p>
      <p>Ticket: ${bookingInfo.ticketType}</p>
    `;
  }
});

movieSelect.addEventListener('change', () => {
  // get the selected option value
  const selectedOption = movieSelect.options[movieSelect.selectedIndex].value;

  // update the input value with the selected option value
  selectedMovie.value = selectedOption;
});




