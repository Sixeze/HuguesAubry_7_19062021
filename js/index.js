import { displayRecipes } from "./recipeCards.js";
import { recipeFilter } from "./searchBar.js";
import { recipes } from "./recipes.js";

// import { recipeClass } from "./recipesClass.js";

const allRecipes = recipes;
let newRecipes = allRecipes;
let selectedIngredient = [];
let selectedAppliance = [];
let selectedUstensil = [];
let filteredRecipe = [];

// DOM elements for index
const searchBar = document.querySelector(".inputSearchBar");
const mainDisplayRecipes = document.querySelector("#displayRecipes");
const tagBoxContainer = document.querySelector("#tagBoxContainer");

// DOM elements for ingredients
const ingredientInput = document.querySelector("#ingredients");
const applianceInput = document.querySelector("#appliances");
const ustensilInput = document.querySelector("#ustensils");

/**
 * addEventlistener for input searchBar
 */
searchBar.addEventListener("input", (e) => {
  let inputValue = e.target.value;
  if (inputValue.length > 2) {
    mainDisplayRecipes.innerHTML = "";
    newRecipes = [];
    recipeFilter(inputValue, allRecipes, newRecipes);
    displayRecipes(newRecipes);
  }
  if (inputValue.length <= 2 && tagBoxContainer.innerHTML === "") {
    newRecipes = allRecipes;
    displayRecipes(newRecipes);
  }
});

/**
 * addEventlistener for inputs combobox
 */
ingredientInput.addEventListener("input", (e) => {
  onInput(e, selectedIngredient);
  filteredIngredientToRecipe(selectedIngredient);
  displayTagElement(selectedIngredient, "bg-primary", ingredientInput);
  displayRecipes(newRecipes);

  selectedIngredient = [];
});

applianceInput.addEventListener("input", (e) => {
  onInput(e, selectedAppliance);
  displayTagElement(selectedAppliance, "bg-success", applianceInput);
  filteredApplianceToRecipe(selectedAppliance);
  displayRecipes(newRecipes);

  selectedIngredient = [];
});

ustensilInput.addEventListener("input", (e) => {
  onInput(e, selectedUstensil);
  displayTagElement(selectedUstensil, "bg-danger", ustensilInput);
  filteredUstensilToRecipe(selectedUstensil);
  displayRecipes(newRecipes);

  selectedIngredient = [];
});

/**
 *
 * @param {*} e event to input.value
 * @param {*} arrayForTag array for ingredient/appliance/ustensils
 */
function onInput(e, arrayForTag) {
  let input = e.target;
  let inputTag = input.value.toLowerCase();
  arrayForTag.push(inputTag);
}
/**
 *
 * @param {*} arrayForTag array for ingredient/appliance/ustensils
 */
function filteredIngredientToRecipe(arrayForTag) {
  filteredRecipe = [];
  newRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((i) => {
      let ingredient = i.ingredient;
      if (ingredient.toLowerCase().indexOf(arrayForTag) !== -1) {
        newRecipes = [];
        filteredRecipe.push(recipe);
        newRecipes = filteredRecipe;
      }
    });
  });
}

function filteredApplianceToRecipe(arrayForTag) {
  filteredRecipe = [];
  newRecipes.forEach((recipe) => {
    if (recipe.appliance.toLowerCase().indexOf(arrayForTag) !== -1) {
      newRecipes = [];
      filteredRecipe.push(recipe);
      newRecipes = filteredRecipe;
    }
  });
}

function filteredUstensilToRecipe(arrayForTag) {
  filteredRecipe = [];
  newRecipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      if (ustensil.toLowerCase().indexOf(arrayForTag) !== -1) {
        newRecipes = [];
        filteredRecipe.push(recipe);
        newRecipes = filteredRecipe;
      }
    });
  });
}

/**
 * function for display tag
 * @param {*} arrayForTag array for ingredient/appliance/ustensils
 * @param {*} color css of bg color of element ingredient/appliance/ustensils
 * @param {*} input html element for input ingredient/appliance/ustensils
 */

function displayTagElement(arrayForTag, color, input) {
  // tagBoxContainer.innerHTML = "";

  arrayForTag.forEach((elt) => {
    tagBoxContainer.innerHTML += `<button type="button" class="btn ${color} text-white mx-1">
                                    ${elt} <img src="img/close.svg" alt="close" class="mx-1">
                                  </button>`;
    input.value = "";

    let tagBtn = document.querySelectorAll(".btn");
    tagBtn.forEach((btn) =>
      btn.addEventListener("click", () => {
        arrayForTag.splice(arrayForTag.indexOf(elt), 1);

        tagBoxContainer.removeChild(btn);
        displayRecipes(newRecipes);

        if (tagBoxContainer.innerHTML === "") {
          newRecipes = allRecipes;
          displayRecipes(newRecipes);
        }
      })
    );
  });
}

// show Recipe open Page
displayRecipes(allRecipes);
