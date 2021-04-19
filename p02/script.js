// Movie Seat Selector | April 17th, 2021
        // Version 1.0 - Nabeel Altaf
        // Last Modified April 19th | 2:35 P.M


const container = document.querySelector('.container'); // Returns only one selection. See next line
const seats = document.querySelectorAll('.row .seat:not(.occupied)'); // Will retrieve ALL of the seats within the rows
const count = document.getElementById('count'); // Get the seat selection count
const total = document.getElementById('total'); // Get the total price based on seat selection
const movieSelect = document.getElementById('movie'); // Get the movie selector
let ticketPrice = +movieSelect.value; // Adding a plus sign before parses it into a number

populateUI();

// Pull data from local storage to build UI
function populateUI() {
    // Retrieve Seats from the local storage
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')); // Takes one argument which is the key | Json.parse converts back to array
    
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach( (seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }
    
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }


} 

// All Functions
// Function to update counts
function updateSelectedCount () {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const countSelectedSeats = selectedSeats.length;

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    // Update Display of total price and selected seats
    count.innerText = countSelectedSeats;
    total.innerText = countSelectedSeats * ticketPrice;
}

// Function to save the selected movie and its price
function setMovieData (movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Event Listener For Change on Movie Selector Dropdown
movieSelect.addEventListener("change", e => {
    ticketPrice = +e.target.value; // Target Value Parsed with Plus Sign
    updateSelectedCount();

    setMovieData(e.target.selectedIndex, e.target.value);
});

// Event Listener for seats | CLick on available seats
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

// Calculate initial number of seats and total price
updateSelectedCount();
