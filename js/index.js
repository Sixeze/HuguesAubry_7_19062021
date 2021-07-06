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
let arrayforAllTag = [selectedIngredient, selectedAppliance, selectedUstensil];

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
  console.log("selectedIngredient", selectedIngredient);
  closeTag();

  displayRecipes(newRecipes);
});

// filteredRecipe.filter((recipe) => !recipe.ingredient.includes(arrayForTag[a]));

applianceInput.addEventListener("input", (e) => {
  onInput(e, selectedAppliance);
  displayTagElement();
  filteredApplianceToRecipe(selectedAppliance);
  closeTag();
  displayRecipes(newRecipes);
});

ustensilInput.addEventListener("input", (e) => {
  onInput(e, selectedUstensil);

  displayTagElement();
  filteredUstensilToRecipe(selectedUstensil);
  closeTag();
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
  console.log("newRecipes :", newRecipes);
  console.log("filteredRecipe :", filteredRecipe);

  newRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((i) => {
      let ingredient = i.ingredient.toLowerCase();
      multipleElementInArray(ingredient, arrayForTag, recipe);
    });
  });

  filterUniqueRecipe(filteredRecipe);

  console.log("filteredRecipe :", filteredRecipe);

  filteredRecipe = [];
  console.log("newRecipes :", newRecipes);
  console.log("filteredRecipe :", filteredRecipe);
  console.log("fin de la fonction");
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
      // console.log("recipe.name");
      console.log(arrayForTag[a]);
      // console.log(recipe);
      newRecipes = [];

      // console.log("filteredRecipe :", filteredRecipe);
      filteredRecipe.push(recipe);
      newRecipes = filteredRecipe;
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

      tagBoxContainer.innerHTML += `<button type="button" class="btn ${color}  text-white mx-1">
                                     ${tag} <img src="img/close.svg" alt="close" class="mx-1">
                                     </button>`;
    }
  }
}

/**
 * function for remove tagSelected
 */
function closeTag() {
  let tagBtn = document.querySelectorAll(".btn");
  tagBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      tagBoxContainer.removeChild(btn);

      for (let a = 0; a < arrayforAllTag.length; a++) {
        let array = arrayforAllTag[a];
        for (let t = 0; t < arrayforAllTag[a].length; t++) {
          let tag = arrayforAllTag[a][t];
          // console.log(tag);
          let indexTag = array.indexOf(tag);
          console.log(indexTag);
          array.splice(indexTag, 1);
        }
      }
      // console.log(arrayforAllTag);
      if (tagBoxContainer.innerHTML === "") {
        newRecipes = allRecipes;
        displayRecipes(newRecipes);
      }
      console.log("selectedIngredient", selectedIngredient);
    });
  });
}

// show Recipe open Page
displayRecipes(allRecipes);
