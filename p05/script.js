// Getting Elements by DOM
const main = document.getElementById('main'); // Main element
const addUserButton = document.getElementById('add-user');
const doubleMoneyButton = document.getElementById('double');
const showMillionairesButton = document.getElementById('show-millionaires');
const sortButton = document.getElementById('sort');
const totalButton = document.getElementById('calculate-total');

// Initializing Data Array
let data = [];

// Create Initial User
generateRandomUser();
generateRandomUser();
generateRandomUser();

// Function to fetch random user from API
// API: randomuser.me/api
async function generateRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        worth: Math.round(Math.random() * 10000000)    
    }
    addData(newUser);
}

// Function to double the Net Worth of each user
function doubleWorth () {
    data = data.map( item => {
        return { ...item, worth: item.worth * 2 }
    }); // The map function will take an array and return the identical array. The reuslting array's values can be manipulated on that return
    updateDOM();
}

// Function to sort users by the richest users
function sortRichest() {
    data.sort( (a, b) => b.worth - a.worth );

    updateDOM();
}

// Function to filter the users and only show millionaires
function showMillionaires () {
    data = data.filter(
        item => item.worth > 1000000
    );

    updateDOM();
}

// Function to calculate the total net worth of all the userse
function calculateTotalNetWorth () {
    const totalWorth = data.reduce(
        (acc, item) => (acc += item.worth), 0
    );

    const totalNetWorthElement = document.createElement('div');
    totalNetWorthElement.innerHTML = `<h3>Total Net Worth: <strong>${formatCurrency(totalWorth)}</strong></h3>`
    main.appendChild(totalNetWorthElement);
}

// Function to Add Newly Generated User into the Data Array
function addData (newUser) {
    data.push(newUser); // Pushes the data from newUser into the data array

    updateDOM();
}

// Function to update the UI with DOM
function updateDOM(inputData = data) {
    main.innerHTML = '<h2><strong>Name</strong> Net Worth</h2>';
    
    inputData.forEach( item => {
        const element = document.createElement('div');
        element.classList.add('name');
        element.innerHTML = `<strong>${item.name}</strong> ${formatCurrency(item.worth)}`; // Name and worth come from the object that we created earlier.
        main.appendChild(element);
    });
}

// Function to format a number as a currency
function formatCurrency (num) {
    return 'USD ' + (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event Listeners
// 1. Add User Event Listener
addUserButton.addEventListener('click', generateRandomUser);

// 2. Add Event listener to double the worth
doubleMoneyButton.addEventListener('click', doubleWorth);

// 3. Add Sorth Event Listener
sortButton.addEventListener('click', sortRichest);

// 4. Add show millionaires event listner
showMillionairesButton.addEventListener('click', showMillionaires);

// 5. Add calculate total wealth event listener
totalButton.addEventListener('click', calculateTotalNetWorth);