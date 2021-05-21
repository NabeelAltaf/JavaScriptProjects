// Topic related to fetching APIs.
// Dynamically Calculate using a third-party API

// Getting Elements from DOM
const currOnePicker = document.getElementById('currency-one');
const currTwoPicker = document.getElementById('currency-two');
const currOneAmount = document.getElementById('amount-one');
const currTwoAmount = document.getElementById('amount-two');
const flipButton = document.getElementById('flip');
const rate = document.getElementById('rate');

// Fetch exchange rate from 3rd party API and update the DOM
// https://app.exchangerate-api.com/
function calculate() {
    const currencyOneCode = currOnePicker.value;
    const currencyTwoCode = currTwoPicker.value;
    
    fetch(`https://v6.exchangerate-api.com/v6/f52f47d6c62e33cb176c8a04/latest/${currencyOneCode}`)
        .then( res => res.json())
        .then( data => {
            // Get the exchange rate from API data
            const exchangeRate = data.conversion_rates[currencyTwoCode];

            // Display the conversion rate
            rate.innerText = `1 ${currencyOneCode} = ${exchangeRate} ${currencyTwoCode}`;

            // Apply the conversion rate and update the amount of currency two
            currTwoAmount.value = (currOneAmount.value * exchangeRate).toFixed(2);
        });
}

// Flip function for the flip button to reverse the currency exchange
function flip () {
    const temp = currOnePicker.value;
    currOnePicker.value = currTwoPicker.value;
    currTwoPicker.value = temp;
    calculate();
}

// Event Listeners
currOnePicker.addEventListener('change', calculate); // Change is best for dropdown menus
currTwoPicker.addEventListener('change', calculate);
currOneAmount.addEventListener('input', calculate); // input used for number changes in a input box
currTwoAmount.addEventListener('input', calculate);

flipButton.addEventListener('click', flip);

calculate();