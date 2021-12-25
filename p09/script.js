// Get DOM Elements
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const description = document.getElementById('description');
const amount = document.getElementById('amount');

// Dummy Transactions

// An array of objects coming from a local storage
const dummyTransactions = [
    { id: 1, description: 'Salary', amount: 130000 },
    { id: 2, description: 'Electric Bill', amount: -1200 },
    { id: 3, description: 'Internet Bill', amount: -500 }
];

let transactions = dummyTransactions;

// Functions
// All transactions to be displayed into DOM

// Function to display transactions in transaction history
function addTransactionUI (transaction) {
    // Find out if this is an income or expense
    const type = transaction.amount > 0 ? '+' : '-';

    // Create a DOM element for list item
    const item = document.createElement('li');

    // Add class for list item based on type
    item.classList.add( transaction.amount > 0 ? 'plus' : 'minus' );

    item.innerHTML = `
        ${transaction.description}
        <span>${type}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn>x/button>
    `;

    list.appendChild(item);
}

// Function to update the balance, income, and expense
function updateSums () {
    // Create array of transaction amounts from transactions array
    const amounts = transactions.map( transaction => transaction.amount );
    
    // Calculate total value for balance
    const total = amounts.reduce( (acc, amount) => (acc += amount), 0).toFixed(2);

    // Calculate total income
    const income = amounts.filter(amount => amount > 0).reduce( (acc, amount) => (acc += amount), 0).toFixed(2);
    console.log(total);
}

// Function to initialize the app
function init () {

    list.innerHTML = '';

    transactions.forEach(addTransactionUI);
    updateSums();
}

init();