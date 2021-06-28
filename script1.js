const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('recipe');
const mealDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});


// get meal list that matches with the ingredients
function getMealList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                    <div class = "recipe-item" data-id = "${meal.idMeal}">
                        <div class = "recipe-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "recipe-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
                });
                mealList.classList.remove('notFound');
            } else {
                html = "Sorry, we didn't find any meal!";
                mealList.classList.add('notFound');
            }

            mealList.innerHTML = html;
        });
}


// get recipe of the meal
function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(data => mealRecipeModal(data.meals));
    }
}

// create a modal
function mealRecipeModal(recipe) {
    console.log(recipe);
    recipe = recipe[0];
    let html = `
        <h2 class = "recipe-title">${recipe.strMeal}</h2>
        <p class = "recipe-category">${recipe.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${recipe.strInstructions}</p>
        </div>
        <div class = "recipe-img">
            <img src = "${recipe.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${recipe.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}