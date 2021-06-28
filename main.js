let addBtn = document.getElementById("add-btn");
let addTitle = document.getElementById("recipe-title");
let addTxt = document.getElementById("recipe-text");


addBtn.addEventListener("click", (e) => {


    if (addTitle.value == "" || addTxt.value == "") {
        return alert("Please add Recipe Title and Details")
    }

    let recipes = localStorage.getItem("recipes");
    if (recipes == null) {
        recipesObj = [];
    } else {
        recipesObj = JSON.parse(recipes);
    }
    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }
    recipesObj.push(myObj);
    localStorage.setItem("recipes", JSON.stringify(recipesObj));
    addTxt.value = "";
    addTitle.value = "";
    showRecipes();
})

function showRecipes() {
    let recipes = localStorage.getItem("recipes");
    if (recipes == null) {
        recipesObj = [];
    } else {
        recipesObj = JSON.parse(recipes);
    }
    let html = "";
    recipesObj.forEach(function(element, index) {
        html +=
            `
           
            
            <div class="recipe">
                <h3 class="recipe-title"> ${element.title} </h3>
                <p class="recipe-text"> ${element.text}</p>
                <button id="${index}"onclick="deleteRecipe(this.id)" class="recipe-btn">Delete Recipe</button>
                <button id="${index}"onclick="editRecipe(this.id)" class="recipe-btn edit-btn">Edit Recipe</button>

            </div>
            
            

           
        `;
    });
    let recipeElm = document.getElementById("recipes");
    if (recipesObj.length != 0) {
        recipeElm.innerHTML = html;
    } else {
        recipeElm.innerHTML = "There are no recipes yet! Add a recipe using the form above.";
    }
}

function deleteRecipe(index) {
    //   console.log("I am deleting", index);
    let confirmDel = confirm("Delete this recipe?");
    if (confirmDel == true) {
        let recipes = localStorage.getItem("recipes");
        if (recipes == null) {
            recipesObj = [];
        } else {
            recipesObj = JSON.parse(recipes);
        }

        recipesObj.splice(index, 1);
        localStorage.setItem("recipes", JSON.stringify(recipesObj));
        showRecipes();
    }

}

function editRecipe(index) {
    let recipes = localStorage.getItem("recipes");
    let addTitle = document.getElementById("recipe-title");
    let addTxt = document.getElementById("recipe-text");

    if (addTitle.value !== "" || addTxt.value !== "") {
        return alert("Please clear the form before editing a recipe")
    }

    if (recipes == null) {
        recipesObj = [];
    } else {
        recipesObj = JSON.parse(recipes);
    }
    console.log(recipesObj);

    recipesObj.findIndex((element, index) => {
        addTitle.value = element.title;
        addTxt.value = element.text;
    })
    recipesObj.splice(index, 1);
    localStorage.setItem("recipes", JSON.stringify(recipesObj));
    showRecipes();
}

showRecipes();