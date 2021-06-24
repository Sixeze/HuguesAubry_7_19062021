import { recipeClass } from "./recipesClass.js";

const classOfRecipe = new recipeClass();
console.log(classOfRecipe);

// DOM elements for index
const searchBar = document.querySelector(".inputSearchBar");
console.log(searchBar);
const tagBoxContainer = document.querySelector(".tagBoxContainer");
const mainDisplayRecipes = document.querySelector("#displayRecipes");

// DOM elements for tagBox
const tagBox = document.querySelector(".tagBoxContainer");

// DOM elements for ingredients
const ingredientInput = document.querySelector("#ingredients");
const datalistIngredients = document.querySelector("#ingredientsList");

// DOM elements for appliances
const applianceInput = document.querySelector("#appliances");
const datalistAppliances = document.querySelector("#appliancesList");

// DOM elements for ustensils
const ustensilInput = document.querySelector("#ustensils");
const datalistUstensils = document.querySelector("#ustensilsList");

// const array from recipeClass
const allRecipesObjElts = classOfRecipe.createAllRecipeList();
const newRecipesObjElts = classOfRecipe.createNewRecipeList();

const ingredientsList = classOfRecipe.createAllIngredientsList();
const appliancesList = classOfRecipe.createAllAppliancesList();
const ustensilsList = classOfRecipe.createAllUstensilsList();
const filteredIngredientList = classOfRecipe.createNewIngredientsList();

// call to line 89
function displayComboBox(arrayIng, arrayApp, arrayUst) {
  datalistIngredients.innerHTML = "";
  datalistAppliances.innerHTML = "";
  datalistUstensils.innerHTML = "";

  arrayIng.forEach((ingredient) => {
    datalistIngredients.innerHTML += `<option value="${ingredient}"${ingredient}</option>`;
  });

  arrayApp.forEach((appliance) => {
    datalistAppliances.innerHTML += `<option value="${appliance}"${appliance}</option>`;
  });

  arrayUst.forEach((ustensil) => {
    datalistUstensils.innerHTML += `<option value="${ustensil}"${ustensil}</option>`;
  });
}

function displayRecipes(arrayRecipe) {
  while (mainDisplayRecipes.firstChild) {
    mainDisplayRecipes.removeChild(mainDisplayRecipes.firstChild);
  }
  mainDisplayRecipes.innerHTML = "";
  arrayRecipe.forEach((recipe) => {
    const articleRecipes = document.createElement("article");
    articleRecipes.classList.add(
      "card",
      "col-md-6",
      "col-xl-4",
      "mb-4",
      "border",
      "border-danger"
    );
    articleRecipes.innerHTML = `<img class="card-img-top bg-color" src="" alt="" width="auto" height="200px">
                                <div class="card-body border border-dark g-0">
                                    <div class="row">
                                    <h5 class="col-9 card-title g-0">${
                                      recipe.name
                                    }</h5>
                                    <p class="col-3 g-0">🕒 ${
                                      recipe.time
                                    }min</p>
                                    </div>
                                    <div class="row">
                                    <p class="col-6 g-0 card-text fw-bold">${recipe.ingredients
                                      .map(
                                        (ingredient) =>
                                          ingredient.ingredient +
                                          (ingredient?.quantity
                                            ? ": " + ingredient.quantity
                                            : "") +
                                          " " +
                                          (ingredient.unit || "")
                                      )
                                      .join("</br>")}</p>
                                    <p class="col-6 card-text textDescription">${
                                      recipe.description
                                    }</p>
                                    </div>
                                </div>`;
    mainDisplayRecipes.appendChild(articleRecipes);
  });

  // func to show 3 combobox list
}

// all input search
searchBar.addEventListener("input", filterCardElements);
ingredientInput.addEventListener("input", onInput);
applianceInput.addEventListener("input", onInput);
ustensilInput.addEventListener("input", (e) => {
  onInput(e);
  ustensilInput.value = "";

  // listustensilsSelect(newRecipes); // func new datalist
  // ustensilInput.value = ""; // reinnicialise l'input après l'appel des fonctions
});

//function for comboBox
function onInput(e) {
  let input = e.target;
  let val = input.value.toLowerCase();
  let list = input.getAttribute("list");
  let options = document.getElementById(list).childNodes;
  // console.log(options);
  options.forEach((option) => {
    let optVal = option.value.toLowerCase();
    if (optVal === val) {
      console.log(optVal);
      ingredientSelected(optVal);
      applianceSelected(optVal);
      ustensilSelected(optVal);

      displayRecipes(newRecipesObjElts);
      console.log(newRecipesObjElts);
      displayComboBox(filteredIngredientList, appliancesList, ustensilsList);
    }
  });
}

function ingredientSelected(elementSelected) {
  allRecipesObjElts.forEach((recipe) => {
    recipe.ingredients.forEach((i) => {
      let ingredient = i.ingredient;
      if (ingredient.toLowerCase().indexOf(elementSelected) === -1) {
        return false;
      } else {
        newRecipesObjElts.push(recipe);
        return true;
      }
    });
  });
}

function applianceSelected(elementSelected) {
  allRecipesObjElts.forEach((recipe) => {
    if (recipe.appliance.toLowerCase().indexOf(elementSelected) === -1) {
      return false;
    } else {
      console.log(
        "la recette '" +
          recipe.name +
          "' contient l'element: " +
          elementSelected
      );
      newRecipesObjElts.push(recipe);
      return true;
    } //else
  });
}

function ustensilSelected(elementSelected) {
  allRecipesObjElts.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      if (ustensil.toLowerCase().indexOf(elementSelected) === -1) {
        return false;
      } else {
        console.log(
          "la recette '" +
            recipe.name +
            "' contient l'element: " +
            elementSelected
        );
        newRecipesObjElts.push(recipe);
        return true;
      } //else
    }); // forEachU
  }); // forEachR
}

// function createTagElt() {
//
// }

//function for Search Bar
function filterCardElements(e) {
  let inputValue = e.target.value;
  if (inputValue.length > 2) {
    mainDisplayRecipes.innerHTML = "";
    displayRecipes();
  }
  if (inputValue.length <= 2) {
    displayRecipes(allRecipesObjElts);
  } else {
    mainDisplayRecipes.innerHTML =
      "<h2>il n'y a pas de recettes avec vos critère de recherche</h2>";
  }
}

// show Recipe open Page
displayRecipes(allRecipesObjElts);
displayComboBox(ingredientsList, appliancesList, ustensilsList);

// const newRecipeObjectList = classOfRecipe.createNewRecipeList();
// console.log(newRecipeObjectList);
