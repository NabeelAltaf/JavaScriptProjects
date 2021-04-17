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
function checkEmail (input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, `Please provide a valid email.`);
    }
}

// Function to check if required fields have data
function checkRequired (inputArray) {
    inputArray.forEach(function(input) {
        if (input.value === "") {
            showError(input, `${getFieldID(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}                                                          

// Function to check length of inputfield
function checkLength (input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldID(input)} is lower than ${min} characters.`);
    } else if (input.value.length > max) {
        showError(input, `${getFieldID(input)} is greater than ${max} characters.`);
    } else {
        showSuccess(input);
    }
}

// Function to check if password and confirm match between both passwords
function checkPasswordsMatch (input1, input2) {
    if (input1.value !== input2.value) {
        showError (input2, `Password does not match.`);
    }
}

// Function to get the ID of the input field with proper case
function getFieldID (input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// This is an event listener for the form on submit
form.addEventListener('submit', function(e) { // Submit event listener calls a function

    e.preventDefault(); // Removes the auto-refresh when the submit button is clicked.
    
    checkRequired ([username, email, password, password2]); // Calling checkRequired through array
    checkLength(username, 3, 10);
    checkLength(password, 6, 30);
    checkEmail(email);
    checkPasswordsMatch(password, password2);

})