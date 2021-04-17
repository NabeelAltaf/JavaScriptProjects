// Script JS / Version 1.0 | Created April 17, 2021

// The first conception in javascript we will be using is DOM
// DOM stands for Document Object Model
    // We want to use javascript to manupulate the HTML document. In order for it to understand
    // the HTML document, it will take all of the html elements and consider them as nodes in
    // the DOM.


// We must first call the HTML page and grab element(s)
// Since we are working with the form, we will need to grab the form from the HTML document

// Accessing the document at the most top level with the "document" tag. Inside of that, we need to use
// the dot (.) to access the HTML file. getElementByID is a method that is a function. We can get an
// element just based on its ID using this "getElementByID" method.

// Store all elements in constants
const form = document.getElementById('form'); 
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// The submit button must wait using an EventListener in the event of when it is clicked on.
// The JS code will wait for the user to click the submit button and then we can define what it should do.
// The object we will be using is the predefined constants we declared at the top from the getElement method(s).

// All Functions
// Function To Show Error
function showError (input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error'; // Overrides the entire class name. Add all the class names
    const small = formControl.querySelector('small'); // Query Selector gets the small tag.
    small.innerText = message; // Whatever is in the inner text between the <small> </small> tags.
}

// Function to show success
function showSuccess (input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Function to check if email is valid
function isValidEmail (email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// This is an event listener for the form on submit
form.addEventListener('submit', function(e) { // Submit event listener calls a function

    e.preventDefault(); // Removes the auto-refresh when the submit button is clicked.
    
    // Check if the input fields are empty
    if (username.value === '') {
        showError(username, 'Username is required.');
    } else {
        showSuccess(username);
    }

    if (email.value === '') {
        showError(email, "Email is required.");
    } else if (!isValidEmail(email.value)) {
        showError(email, 'Email is invalid.');
    } else {
        showSuccess(email);
    }

    if (password.value === '') {
        showError(password, 'Password is required.');
    } else {
        showSuccess(password);
    }

    if (password2.value === '') {
        showError(password2, 'Confirm password.');
    } else {
        showSuccess(password2);
    }
});