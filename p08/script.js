// DOM Elements grabbing

const search = document.getElementById('search'); // search button
const submit = document.getElementById('submit'); // submit form
const random = document.getElementById('random'); // random button
const resultHeading = document.getElementById('result-heading'); // result heading
const mealContainer = document.getElementById('meals'); // meals div
const selectedMeal = document.getElementById('selected-meal'); // selected meals div


// Function to search meal from API and fetch the data
function searchMeal (e) {
    // Prevent the page from reloading on submit
    e.preventDefault();

    // Clear the selected meal instructions
    selectedMeal.innerHTML = '';

    // Get the search term from the input field
    const term = search.value;

    // Check if search term exists ? ? ?
    if (term.trim()) { // trim removes all white spaces.
        // Connect to the API and fetch the data
        fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`) // backticks so that we can use the term with it
            .then (res => res.json())
            .then (data => {
                resultHeading.innerHTML = `<h2>Search results for '${term}'</h2>`;
                if (data.meals == null) {
                    resultHeading.innerHTML = `<p>No results found for '${term}'. Please try a different search.<p>`
                } else {
                    mealContainer.innerHTML = data.meals.map( meal => `
                        <div class = "meal">
                            <img src = "${meal.strMealThumb}" alt = "${meal.strMeal}"/>
                            <div class = "meal-info" data-mealID="${meal.idMeal}">
                                <h3>${meal.strMeal}</h3>
                            </div>
                        </div>
                    `)
                    .join(''); // Will get rid of the commas
                }

            })
    } else {
        alert('ERROR: Please enter a valid search.');
    }

    // Clear the search term
    search.value = '';

}

// Function to fetch meal data using the Meal ID
function getMealByID (mealID) {
    fetch (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then (res => res.json())
    .then (data => {
        // Since this returns an array, we need the first element
        const meal = data.meals[0];
        addMealToDOM(meal);
    })
}

// Function to add a meal to DOM
function addMealToDOM (meal) {
    // All of the ingredients are seperate objects from their measures
    const ingredients = []; 

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else {
            break;
        }
    }

    selectedMeal.innerHTML = `
        <div class = "selected-meal">
            <h1>${meal.strMeal}</h1>
            <img src = "${meal.strMealThumb}" alt = "${meal.strMeal}" />

            <div class = "selected-meal-info">
                ${meal.strCategory ? `<p class = "selected-meal-heading">${meal.strCategory}</p>` : ''}
                ${meal.strArea ? `<p class = "selected-meal-heading">${meal.strArea}</p>` : ''}
            </div>

            <div class = "main">
                <p>${meal.strInstructions}</p>
                <h2>Ingredients</h2>
                <ul>
                    ${ingredients.map ( ingredient => `<li>${ingredient}</li>` ).join('')}
                </ul>
            </div>
        </div>
    `;
}

// First we create the submit button. Connect with the API and return
// 1st step is to create an event listener on the button


// Event Listener
// 1. Submit
submit.addEventListener('submit', searchMeal);

// 2. Upon clicking a meal, instructions will be displayed for the recipe
mealContainer.addEventListener('click', e => {
    // The first thing we need to do is figure out what is being clicked
    const mealInfo = e.path.find( item => {
        // This function shows the full stack, HTMl down to the meal info. We need to add a filter
        if (item.classList) {
            return item.classList.contains('meal-info');
        } else {
            return false
        }
    });

    if (mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealID');
        getMealByID(mealID);
    }

});

// 3. Random Button Generator
random.addEventListener('click', e => {
    fetch (`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then (res => res.json())
    .then (data => {
        console.log(data);
    });
});

