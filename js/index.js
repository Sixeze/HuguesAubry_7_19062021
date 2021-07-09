import { displayRecipes } from "./recipeCards.js";
import { recipeFilter } from "./searchBar.js";
import { recipes } from "./recipes.js";

// import { recipeClass } from "./recipesClass.js";

const allRecipes = recipes;
let newRecipes = allRecipes;
let selectedIngredients = [];
let selectedAppliances = [];
let selectedUstensils = [];
let filteredRecipe = [];
let arrayforAllTag = [
  selectedIngredients,
  selectedAppliances,
  selectedUstensils,
];

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
  onInput(e, selectedIngredients);
  displayTagElement();
  // filteredIngredientToRecipe(selectedIngredients);
  displayRecipes(newRecipes);
});

// filteredRecipe.filter((recipe) => !recipe.ingredient.includes(arrayForTag[a]));

applianceInput.addEventListener("input", (e) => {
  onInput(e, selectedAppliances);
  displayTagElement();
  filteredApplianceToRecipe(selectedAppliances);

  displayRecipes(newRecipes);
});

ustensilInput.addEventListener("input", (e) => {
  onInput(e, selectedUstensils);
  displayTagElement();
  filteredUstensilToRecipe(selectedUstensils);
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
  //simplifier la fonction
  // console.log("newRecipes :", newRecipes);
  // console.log("filteredRecipe :", filteredRecipe);
  // newRecipes = [];
  newRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((i) => {
      let ingredient = i.ingredient.toLowerCase();
      multipleElementInArray(ingredient, arrayForTag, recipe);
    });
  });

  filterUniqueRecipe(filteredRecipe);

  // console.log("filteredRecipe :", filteredRecipe);

  filteredRecipe = [];
  // console.log("newRecipes :", newRecipes);
  // console.log("filteredRecipe :", filteredRecipe);
  // console.log("fin de la fonction");
}

function filteredApplianceToRecipe(arrayForTag) {
  newRecipes.forEach((recipe) => {
    if (recipe.appliance.toLowerCase().indexOf(arrayForTag) !== -1) {
      newRecipes = [];
      filteredRecipe.push(recipe);
      newRecipes = filteredRecipe;
    }
  });
  filterUniqueRecipe(filteredRecipe);
  filteredRecipe = [];
}

function filteredUstensilToRecipe(arrayForTag) {
  newRecipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      multipleElementInArray(ustensil, arrayForTag, recipe);
    });
  });
  filterUniqueRecipe(filteredRecipe);
  filteredRecipe = [];
}
/**
 *
 * @param {array of recipe Filter} filteredRecipe
 */
function filterUniqueRecipe(filteredRecipe) {
  let protofilter = filteredRecipe.slice().sort();
  for (let f = 0; f < protofilter.length; f++) {
    if (protofilter[f + 1] == protofilter[f]) {
      console.log(protofilter[f]);
      newRecipes = [];
      newRecipes.push(protofilter[f]);
    }
  }
}

/**
 *
 * @param {element compare} element
 * @param {array of tag selected} arrayForTag
 * @param {recipe to display} recipe
 */
function multipleElementInArray(element, arrayForTag, recipe) {
  for (let a = 0; a < arrayForTag.length; a++) {
    if (element.includes(arrayForTag[a])) {
      console.log(recipe.name);
      // console.log(arrayForTag[a]);
      // console.log(recipe);
      newRecipes = [];

      // console.log("filteredRecipe :", filteredRecipe);
      filteredRecipe.push(recipe);
      newRecipes = filteredRecipe;
      // newRecipes.push(recipe);
    }
  }
}

/**
 * function for display tag
 */
function displayTagElement() {
  // console.log("arrayforAllTag :", arrayforAllTag);
  tagBoxContainer.innerHTML = "";
  for (let i = 0; i < arrayforAllTag.length; i++) {
    // console.log("i =", i, "arrayforAllTag[i] = ", arrayforAllTag[i]);
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
    for (let j = 0; j < arrayforAllTag[i].length; j++) {
      // console.log("i = ", i, "j = ", arrayforAllTag[i][j], j);
      let tag = arrayforAllTag[i][j];

      tagBoxContainer.innerHTML += `<button type="button" value="${tag}" class="btn ${color}  text-white mx-1">
                                     ${tag} <img src="img/close.svg" alt="close" class="mx-1">
                                     </button>`;
      filteredIngredientToRecipe(selectedIngredients);
      closeTag(arrayforAllTag[i]);

      // console.log(newRecipes);
    }
  }
}

function closeTag(array) {
  console.log(array);
  let tagBtn = document.querySelectorAll(".btn");
  tagBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let word = e.target.value;
      console.log(word);
      const index = array.indexOf(word);
      console.log(index);
      if (index > -1) {
        array.splice(index, 1);
      }
      console.log(array);

      btn.remove();

      if (tagBoxContainer.innerHTML === "") {
        newRecipes = allRecipes;
        displayRecipes(newRecipes);
      }

      // rajout d'un filter sur allRecipes pour récupérer uniquement les recettes avec les tags pas déselectionné.
      console.log(allRecipes);
    });
  });
}

/**
 * function for remove tagSelected
 */

// show Recipe open Page
displayRecipes(newRecipes);
