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
let arrayforAllTag = [];

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

  displayTagElement();
  filteredIngredientToRecipe(selectedIngredient);
  displayRecipes(newRecipes);
});

applianceInput.addEventListener("input", (e) => {
  onInput(e, selectedAppliance);

  displayTagElement();
  filteredApplianceToRecipe(selectedAppliance);
  displayRecipes(newRecipes);
});

ustensilInput.addEventListener("input", (e) => {
  onInput(e, selectedUstensil);

  displayTagElement();
  filteredUstensilToRecipe(selectedUstensil);
  displayRecipes(newRecipes);
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

  input.value = "";
}
/**
 *
 * @param {*} arrayForTag array for ingredient/appliance/ustensils
 */
function filteredIngredientToRecipe(arrayForTag) {
  filteredRecipe = [];
  newRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((i) => {
      let ingredient = i.ingredient.toLowerCase();
      if (ingredient.indexOf(arrayForTag) !== -1) {
        newRecipes = [];
        filteredRecipe.push(recipe);
        // console.log(recipe);
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
 */

function displayTagElement() {
  arrayforAllTag = [selectedIngredient, selectedAppliance, selectedUstensil];
  console.log("arrayforAllTag :", arrayforAllTag);

  tagBoxContainer.innerHTML = "";

  for (let i = 0; i < arrayforAllTag.length; i++) {
    console.log("i =", i, "arrayforAllTag[i] = ", arrayforAllTag[i]);
    for (let j = 0; j < arrayforAllTag[i].length; j++) {
      console.log("i = ", i, "j = ", arrayforAllTag[i][j], j);
      let tag = arrayforAllTag[i][j];
      let color;
      if (i === 0) {
        color = "btn-primary";
      }
      if (i === 1) {
        color = "btn-success";
      }
      if (i === 2) {
        color = "btn-danger";
      }

      tagBoxContainer.innerHTML += `<button type="button" class="btn ${color}  text-white mx-1">
                                     ${tag} <img src="img/close.svg" alt="close" class="mx-1">
                                     </button>`;

      let tagBtn = document.querySelectorAll(".btn");
      tagBtn.forEach((btn) =>
        btn.addEventListener("click", () => {
          console.log(arrayforAllTag[i][j]);
          let nbr = arrayforAllTag[i][j];
          var tab = arrayforAllTag[i];
          tab = tab.filter((item) => item !== nbr);
          console.log(tab);

          // tagBoxContainer.removeChild(btn);

          if (tagBoxContainer.innerHTML === "") {
            newRecipes = allRecipes;
            displayRecipes(newRecipes);
          }
        })
      );
    }
  }
}
// console.log("arrayForTag :", arrayForTag);
// console.log("selectedIngredient :", selectedIngredient);
// console.log("selectedAppliance :", selectedAppliance);
// console.log("selectedUstensil :", selectedUstensil);

// show Recipe open Page
displayRecipes(allRecipes);
